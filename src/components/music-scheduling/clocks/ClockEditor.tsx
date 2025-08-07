'use client';

import { useMutation } from '@apollo/client';
import {
  DndContext,
  closestCenter,
  CollisionDetection,
  getFirstCollision,
  pointerWithin,
  rectIntersection,
  UniqueIdentifier,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, Input, Textarea, Badge } from '@soundwaves/components';
import { useDebouncedCallback } from '@tanstack/react-pacer';
import clsx from 'clsx';
import { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FloatingBar } from '@/components/common';
import { ClockIcon, EditIcon, GripVerticalIcon } from '@/components/icons';
import {
  MusicClockItemInput,
  MusicClockItemType,
} from '@/graphql/__generated__/graphql';
import { UPDATE_MUSIC_CLOCK } from '@/graphql/mutations/updateMusicClock';
import { useNetwork } from '@/hooks';
import { toast } from '@/lib/toast';

import {
  calculateClockRuntime,
  calculateRuntimeDifference,
  formatDuration,
  getDefaultClockColor,
  isValidHexColor,
} from '../utils';

import { ClockGrid } from './ClockGrid';
import { ClockItemLibrary } from './ClockItemLibrary';
import {
  QueryMusicClock,
  QueryMusicClockItem,
  LibraryItemType,
  LibraryItemData,
  DragData,
} from './types';
import {
  isGridItemDrag,
  isLibraryItemDrag,
  getDisplayInfo,
  getLibraryDisplayInfo,
} from './utils';

// Drag overlay component to show the item being dragged
function DragOverlayItem({ activeItem }: { activeItem: DragData | null }) {
  if (!activeItem) {
    return <div className="drag-overlay">Dragging item...</div>;
  }

  // Handle grid items
  if (isGridItemDrag(activeItem)) {
    const { title, icon: Icon } = getDisplayInfo(activeItem.item);

    return (
      <div className="clock-item-library__item clock-item-library__item--dragging">
        <div className="clock-item-library__item-icon">
          <Icon size={16} />
        </div>
        <div className="clock-item-library__item-content">
          <div className="clock-item-library__item-title">{title}</div>
        </div>
        <div className="clock-item-library__item-actions">
          <div className="clock-item-library__drag-handle">
            <GripVerticalIcon size={14} />
          </div>
        </div>
      </div>
    );
  }

  // Handle library items
  if (isLibraryItemDrag(activeItem)) {
    const {
      icon: Icon,
      title,
      description,
    } = getLibraryDisplayInfo(activeItem.itemType, activeItem.data);

    return (
      <div className="clock-item-library__item clock-item-library__item--dragging">
        <div className="clock-item-library__item-icon">
          <Icon size={16} />
        </div>
        <div className="clock-item-library__item-content">
          <div className="clock-item-library__item-title">{title}</div>
          <div className="clock-item-library__item-description">
            {description}
          </div>
        </div>
        <div className="clock-item-library__item-actions">
          <div className="clock-item-library__drag-handle">
            <GripVerticalIcon size={14} />
          </div>
        </div>
      </div>
    );
  }

  return <div className="drag-overlay">Unknown item type</div>;
}

const clockFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  color: z.string().refine(isValidHexColor, 'Must be a valid hex color'),
  targetRuntime: z.number().min(1, 'Target runtime must be greater than 0'),
});

type ClockFormData = z.infer<typeof clockFormSchema>;

interface ClockEditorProps {
  clock?: QueryMusicClock;
}

export const TRASH_ID = 'library';

export const ClockEditor = ({ clock }: ClockEditorProps) => {
  const { currentNetwork } = useNetwork();
  const isEditing = !!clock;

  const [clockItems, setClockItems] = useState<QueryMusicClockItem[]>(
    clock?.items || [],
  );

  // Sync local state with clock prop changes (e.g., after refetch)
  useEffect(() => {
    if (clock?.items) {
      setClockItems(clock.items);
    }
  }, [clock?.items]);

  const [isClockDialogOpen, setIsClockDialogOpen] = useState(false);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeItem, setActiveItem] = useState<DragData | null>(null);
  const [insertionIndex, setInsertionIndex] = useState<number | null>(null);
  const lastOverId = useRef<UniqueIdentifier | null>(null);
  const recentlyMovedToNewContainer = useRef(false);
  const draggableContainers = useMemo(
    () => ({
      library: [] as Array<string>,
      clockItems: clockItems.map((item) => item.id),
    }),
    [clockItems],
  );

  const [updateClock, { loading: updateLoading }] =
    useMutation(UPDATE_MUSIC_CLOCK);

  // Create a clock item from library drag data
  const createClockItemFromLibraryData = useCallback(
    (itemType: LibraryItemType, data: LibraryItemData): QueryMusicClockItem => {
      const baseItem = {
        id: `temp-${Date.now()}-${Math.random()}`,
        clockId: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        orderIndex: clockItems.length,
        duration: (data.duration as number) || 180,
      };

      switch (itemType) {
        case 'track':
          return {
            ...baseItem,
            __typename: 'TrackClockItem' as const,
            track: {
              __typename: 'Track' as const,
              id: data.trackId as string,
              title:
                (data.name as string).split(' - ')[1] || (data.name as string),
              artist: (data.artist as string | undefined) ?? '',
            },
          };
        case 'subcategory':
          return {
            ...baseItem,
            __typename: 'SubcategoryClockItem' as const,
            subcategory: {
              __typename: 'Subcategory' as const,
              id: data.subcategoryId as string,
              name: data.name as string,
              color: data.color as string,
              category: {
                __typename: 'Category' as const,
                id: '',
                name: '',
              },
            },
          };
        case 'genre':
          return {
            ...baseItem,
            __typename: 'GenreClockItem' as const,
            genre: {
              __typename: 'Genre' as const,
              id: data.genreId as string,
              name: data.name as string,
            },
          };
        case 'note':
          return {
            ...baseItem,
            __typename: 'NoteClockItem' as const,
            duration: 0,
            content: data.content as string,
            label: data.name as string,
          };
        case 'command':
          return {
            ...baseItem,
            __typename: 'CommandClockItem' as const,
            command: data.command as string,
          };
        case 'ad_break':
          return {
            ...baseItem,
            __typename: 'AdBreakClockItem' as const,
            scheduledStartTime: data.scheduledStartTime as string,
          };
        case 'library_note':
          return {
            ...baseItem,
            __typename: 'LibraryNoteClockItem' as const,
            duration: 0,
            note: {
              __typename: 'MusicClockLibraryNote' as const,
              id: data.libraryItemId as string,
              duration: 0,
              content: data.content as string,
              label: data.name as string,
            },
          };
        case 'library_command':
          return {
            ...baseItem,
            __typename: 'LibraryCommandClockItem' as const,
            libraryCommand: {
              __typename: 'MusicClockLibraryCommand' as const,
              id: data.libraryItemId as string,
              duration: (data.duration as number) || 0,
              command: data.command as string,
            },
          };
        case 'library_ad_break':
          return {
            ...baseItem,
            __typename: 'LibraryAdBreakClockItem' as const,
            adBreak: {
              __typename: 'MusicClockLibraryAdBreak' as const,
              id: data.libraryItemId as string,
              duration: (data.duration as number) || 180,
              scheduledStartTime: data.scheduledStartTime as string,
            },
          };
        default:
          throw new Error(`Unsupported item type: ${itemType}`);
      }
    },
    [clockItems.length],
  );

  // Convert ClockItem to MusicClockItemInput for API
  const convertClockItemToInput = useCallback(
    (item: QueryMusicClockItem): MusicClockItemInput => {
      const baseInput = {
        // Use empty string for new items, real ID for existing items
        id: item.id.startsWith('temp-') ? '' : item.id,
        orderIndex: item.orderIndex,
        duration: Math.floor(Math.abs(item.duration)),
      };

      switch (item.__typename) {
        case 'TrackClockItem':
          return {
            ...baseInput,
            type: MusicClockItemType.Track,
            itemId: item.track?.id,
          };
        case 'SubcategoryClockItem':
          return {
            ...baseInput,
            type: MusicClockItemType.Subcategory,
            itemId: item.subcategory?.id,
          };
        case 'GenreClockItem':
          return {
            ...baseInput,
            type: MusicClockItemType.Genre,
            itemId: item.genre?.id,
          };
        case 'NoteClockItem':
          return {
            ...baseInput,
            type: MusicClockItemType.Note,
            content: item.content,
            label: item.label,
          };
        case 'LibraryNoteClockItem':
          return {
            ...baseInput,
            type: MusicClockItemType.LibraryNote,
            itemId:
              'note' in item ? (item.note as { id: string }).id : undefined,
          };
        case 'LibraryCommandClockItem':
          return {
            ...baseInput,
            type: MusicClockItemType.LibraryCommand,
            itemId:
              'libraryCommand' in item
                ? (item.libraryCommand as { id: string }).id
                : undefined,
          };
        case 'LibraryAdBreakClockItem':
          return {
            ...baseInput,
            type: MusicClockItemType.LibraryAdBreak,
            itemId:
              'adBreak' in item
                ? (item.adBreak as { id: string }).id
                : undefined,
          };
        case 'CommandClockItem':
          return {
            ...baseInput,
            type: MusicClockItemType.Command,
            command: item.command,
          };
        case 'AdBreakClockItem':
          return {
            ...baseInput,
            type: MusicClockItemType.AdBreak,
            scheduledStartTime: item.scheduledStartTime,
          };
        default:
          throw new Error(`Unsupported clock item type: ${item.__typename}`);
      }
    },
    [],
  );

  // Core save function
  const saveClockItemsCore = useCallback(
    async (items: QueryMusicClockItem[]) => {
      if (!clock?.id || !isEditing) return;

      try {
        const itemInputs = items.map(convertClockItemToInput);
        const result = await updateClock({
          variables: {
            input: {
              id: clock.id,
              items: itemInputs,
            },
          },
        });

        if (result.data?.updateMusicClock?.clock?.items) {
          setClockItems(result.data.updateMusicClock.clock.items);
        }
      } catch (error) {
        console.error('Error saving clock items:', error);
        toast('Failed to save changes', 'error');
      }
    },
    [clock?.id, convertClockItemToInput, isEditing, updateClock],
  );

  // Debounced version using TanStack react-pacer
  const saveClockItems = useDebouncedCallback(
    (items: QueryMusicClockItem[]) => {
      saveClockItemsCore(items);
    },
    {
      wait: 50,
      trailing: true,
    },
  );

  const form = useForm<ClockFormData>({
    resolver: zodResolver(clockFormSchema),
    defaultValues: {
      name: clock?.name || '',
      description: clock?.description || '',
      color: clock?.color || getDefaultClockColor(),
      targetRuntime: clock?.targetRuntime || 3600,
    },
  });

  const handleAddItem = useCallback(
    (itemType: LibraryItemType, data: LibraryItemData, position?: number) => {
      const newItem = createClockItemFromLibraryData(itemType, data);

      setClockItems((prev) => {
        let newItems: QueryMusicClockItem[];

        if (position !== undefined && position < prev.length) {
          // Insert at specific position
          newItems = [...prev];
          newItems.splice(position, 0, newItem);
        } else {
          // Add to end
          newItems = [...prev, newItem];
        }

        // Update order indices
        const itemsWithOrderIndex = newItems.map((item, index) => ({
          ...item,
          orderIndex: index,
        }));

        // Save to API (debounced)
        saveClockItems(itemsWithOrderIndex);

        return itemsWithOrderIndex;
      });
    },
    [createClockItemFromLibraryData, saveClockItems],
  );

  const handleItemEdit = useCallback((item: QueryMusicClockItem) => {
    // Update the item in the list
    const updatedItems = clockItems.map(existingItem => 
      existingItem.id === item.id ? item : existingItem
    );
    setClockItems(updatedItems);
    // Save to API
    saveClockItems(updatedItems);
  }, [clockItems, saveClockItems]);

  const handleItemDelete = useCallback(
    async (itemId: string) => {
      if (!clock?.id || !isEditing) return;

      try {
        // Filter out the item to delete
        const filteredItems = clockItems.filter((item) => item.id !== itemId);

        // Update order indices
        const reorderedItems = filteredItems.map((item, index) => ({
          ...item,
          orderIndex: index,
        }));

        // Convert to API input format
        const itemInputs = reorderedItems.map(convertClockItemToInput);

        // Call API to update clock without the deleted item
        await updateClock({
          variables: {
            input: {
              id: clock.id,
              items: itemInputs,
            },
          },
          onCompleted: (result) => {
            if (result?.updateMusicClock?.clock?.items) {
              setClockItems(result.updateMusicClock.clock.items);
              toast('Item removed from clock', 'success');
            }
          },
          onError: () => {
            toast('Failed to remove item from clock', 'error');
          },
        });
      } catch (error) {
        console.error('Error deleting clock item:', error);
        toast('Failed to remove item from clock', 'error');
      }
    },
    [clock?.id, clockItems, convertClockItemToInput, isEditing, updateClock],
  );

  const handleItemReorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      setClockItems((prev) => {
        const newItems = arrayMove(prev, fromIndex, toIndex);
        const reorderedItems = newItems.map((item, index) => ({
          ...item,
          orderIndex: index,
        }));

        // Save to API immediately
        saveClockItems(reorderedItems);

        return reorderedItems;
      });
    },
    [saveClockItems],
  );

  const handleClockSubmit = useCallback(
    (data: ClockFormData) => {
      if (!currentNetwork?.id) {
        toast('Network not found', 'error');
        return;
      }

      // Update clock metadata - items are saved individually
      const input = {
        ...data,
        targetRuntime: Math.round(data.targetRuntime),
      };

      if (isEditing) {
        updateClock({
          variables: { input: { id: clock.id, ...input } },
          onCompleted: (result) => {
            if (result.updateMusicClock.clock) {
              toast('Clock updated successfully', 'success');
              setIsClockDialogOpen(false);
            } else {
              toast('Failed to update clock', 'error');
            }
          },
          onError: () => {
            toast('Failed to update clock', 'error');
          },
        });
      }
    },
    [currentNetwork?.id, clock?.id, isEditing, updateClock],
  );

  const totalDuration = calculateClockRuntime(clockItems);
  const targetRuntime = form.watch('targetRuntime') || 3600;
  const runtimeDiff = calculateRuntimeDifference(targetRuntime, totalDuration);

  // Drag event handlers
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
    setActiveItem((event.active.data.current as DragData) || null);
  }, []);

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) {
        setInsertionIndex(null);
        return;
      }

      const activeData = active.data.current as DragData;
      const overId = over.id;

      // Handle dragging from library to grid
      if (isLibraryItemDrag(activeData)) {
        // If hovering over library, don't show insertion preview
        if (overId === 'library') {
          setInsertionIndex(null);
        } else if (overId === 'clock-grid') {
          // Dropping at the end
          setInsertionIndex(clockItems.length);
        } else {
          // Find the item we're over
          const overIndex = clockItems.findIndex((item) => item.id === overId);
          if (overIndex !== -1) {
            setInsertionIndex(overIndex);
          }
        }
      } else if (isGridItemDrag(activeData)) {
        // For grid item reordering, don't show ghost insertion preview
        // Let the natural transform movement provide visual feedback
        setInsertionIndex(null);
      }
    },
    [clockItems],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);
      setActiveItem(null);
      setInsertionIndex(null);

      if (!over) return;

      const activeData = active.data.current as DragData;
      const overId = over.id;

      // Handle dropping library item into grid
      if (isLibraryItemDrag(activeData)) {
        // If dropped back on library, do nothing (cancel the drag)
        if (overId === 'library') {
          return;
        }

        let position: number | undefined;

        if (overId === 'clock-grid') {
          // Dropped at the end
          position = clockItems.length;
        } else {
          // Dropped on a specific item
          const overIndex = clockItems.findIndex((item) => item.id === overId);
          if (overIndex !== -1) {
            position = overIndex;
          }
        }

        handleAddItem(activeData.itemType, activeData.data, position);
        return;
      }

      // Handle reordering within grid or deletion by dragging to trash
      if (isGridItemDrag(activeData)) {
        // Check if dropped on library (trash)
        if (overId === TRASH_ID) {
          handleItemDelete(active.id as string);
          return;
        }

        // Handle reordering within grid
        const activeIndex = clockItems.findIndex(
          (item) => item.id === active.id,
        );
        const overIndex = clockItems.findIndex((item) => item.id === over.id);

        if (
          activeIndex !== overIndex &&
          activeIndex !== -1 &&
          overIndex !== -1
        ) {
          handleItemReorder(activeIndex, overIndex);
        }
      }
    },
    [clockItems, handleAddItem, handleItemReorder, handleItemDelete],
  );

  // Dragabble Methods
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in draggableContainers) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (container) => container.id in draggableContainers,
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const intersections =
        pointerIntersections.length > 0
          ? // If there are droppables intersecting with the pointer, return those
            pointerIntersections
          : rectIntersection(args);
      let overId = getFirstCollision(intersections, 'id');

      if (overId != null) {
        if (overId === TRASH_ID) {
          // If the intersecting droppable is the trash, return early
          return intersections;
        }

        if (overId in draggableContainers) {
          const containerItems =
            draggableContainers[overId as keyof typeof draggableContainers];

          if (containerItems.length > 0) {
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (container) =>
                  container.id !== overId &&
                  containerItems.includes(container.id.toString()),
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, draggableContainers],
  );

  return (
    <FormProvider {...form}>
      <DndContext
        collisionDetection={collisionDetectionStrategy}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="clock-editor">
          <div className="clock-editor__sidebar">
            <ClockItemLibrary />
          </div>

          {/* Main Content Area */}
          <div className="clock-editor__main">
            {/* Header with clock info and edit button */}
            <div className="clock-editor__header">
              <div className="clock-editor__header-info">
                <ClockIcon className="clock-editor__icon" />
                <h1 className="clock-editor__title">
                  {clock?.name || 'Untitled Clock'}
                </h1>
                <Badge
                  className="clock-editor__badge"
                  color="gray"
                  size="sm"
                  style={{
                    backgroundColor: clock?.color || '#FF6B6B',
                    color: '#fff',
                  }}
                >
                  {formatDuration(targetRuntime)} target
                </Badge>
              </div>
              <Dialog
                open={isClockDialogOpen}
                onOpenChange={setIsClockDialogOpen}
              >
                <Dialog.Trigger asChild>
                  <Button variant="secondary" size="sm" before={<EditIcon />}>
                    Edit Clock
                  </Button>
                </Dialog.Trigger>
                <Dialog.Overlay />
                <Dialog.Content className="max-w-md">
                  <Dialog.Title>Edit Clock Properties</Dialog.Title>
                  <div className="p-4 space-y-4">
                    <Input
                      label="Clock Name"
                      {...form.register('name')}
                      placeholder="Enter clock name"
                    />

                    <Textarea
                      label="Description"
                      {...form.register('description')}
                      placeholder="Optional description"
                      rows={2}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Color
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            {...form.register('color')}
                            className="w-12 h-10 rounded border border-gray-300"
                          />
                          <Input
                            {...form.register('color')}
                            placeholder="#FF6B6B"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <Input
                        type="number"
                        label="Target Runtime (seconds)"
                        {...form.register('targetRuntime', {
                          valueAsNumber: true,
                        })}
                        placeholder="3600"
                      />
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        variant="secondary"
                        onClick={() => setIsClockDialogOpen(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => form.handleSubmit(handleClockSubmit)()}
                        disabled={updateLoading}
                        className="flex-1"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </Dialog.Content>
              </Dialog>
            </div>

            {/* Clock Items Grid */}
            <div className="clock-editor__content">
              <ClockGrid
                items={clockItems}
                onItemEdit={handleItemEdit}
                onItemDelete={handleItemDelete}
                onItemsUpdate={saveClockItems}
                insertionIndex={insertionIndex}
                draggedItem={activeItem}
              />
            </div>
            <FloatingBar>
              <span className="floating-bar__label">Current Duration</span>
              <div
                className={clsx('floating-bar__duration', {
                  'floating-bar__duration--overtime': runtimeDiff.isOver,
                  'floating-bar__duration--undertime': runtimeDiff.isUnder,
                })}
              >
                <span>{formatDuration(totalDuration)}</span>{' '}
                {!runtimeDiff.isPerfect && (
                  <span className="floating-bar__label">
                    ({runtimeDiff.isOver ? '+' : '-'}
                    {formatDuration(runtimeDiff.difference)})
                  </span>
                )}
              </div>
            </FloatingBar>
          </div>
        </div>

        <DragOverlay>
          {activeId && activeItem && isLibraryItemDrag(activeItem) ? (
            <DragOverlayItem activeItem={activeItem} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </FormProvider>
  );
};

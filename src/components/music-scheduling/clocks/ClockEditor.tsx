'use client';

import { useMutation } from '@apollo/client';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, Input, Textarea, Badge } from '@soundwaves/components';
import { useState, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FloatingBar } from '@/components/common';
import {
  ClockIcon,
  EditIcon,
  AudioIcon,
  CategoryIcon,
  GenreIcon,
  NoteIcon,
  CommandIcon,
  AdIcon,
  GripVerticalIcon,
} from '@/components/icons';
import {
  GetMusicClockQuery,
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

// Component for rendering the drag overlay with proper item content
const DragOverlayContent = ({ item }: { item: ClockItem }) => {
  const getItemIcon = (item: ClockItem) => {
    switch (item.__typename) {
      case 'TrackClockItem':
        return AudioIcon;
      case 'SubcategoryClockItem':
        return CategoryIcon;
      case 'GenreClockItem':
        return GenreIcon;
      case 'NoteClockItem':
      case 'LibraryNoteClockItem':
        return NoteIcon;
      case 'CommandClockItem':
      case 'LibraryCommandClockItem':
        return CommandIcon;
      case 'AdBreakClockItem':
      case 'LibraryAdBreakClockItem':
        return AdIcon;
      default:
        return AudioIcon;
    }
  };

  const getItemTypeLabel = (item: ClockItem) => {
    switch (item.__typename) {
      case 'TrackClockItem':
        return 'Track';
      case 'SubcategoryClockItem':
        return item.subcategory?.name || 'Category';
      case 'GenreClockItem':
        return item.genre?.name || 'Genre';
      case 'NoteClockItem':
        return 'Note';
      case 'CommandClockItem':
        return 'Command';
      case 'AdBreakClockItem':
        return 'Commercial';
      case 'LibraryNoteClockItem':
        return 'Library Note';
      case 'LibraryCommandClockItem':
        return 'Library Command';
      case 'LibraryAdBreakClockItem':
        return 'Library Ad Break';
      default:
        return 'Unknown';
    }
  };

  const getItemTitle = (item: ClockItem) => {
    switch (item.__typename) {
      case 'TrackClockItem':
        return item.track?.title || 'Unknown Track';
      case 'SubcategoryClockItem':
        return 'Unscheduled position';
      case 'GenreClockItem':
        return 'Unscheduled position';
      case 'NoteClockItem':
        return item.content || 'Note';
      case 'CommandClockItem':
        return item.command || 'Command';
      case 'AdBreakClockItem':
        return item.scheduledStartTime || '00:00';
      case 'LibraryNoteClockItem':
        return (
          (item as { note?: { content?: string; label?: string } }).note
            ?.content ||
          (item as { note?: { content?: string; label?: string } }).note
            ?.label ||
          'Library Note'
        );
      case 'LibraryCommandClockItem':
        return (
          (item as { libraryCommand?: { command?: string } }).libraryCommand
            ?.command || 'Library Command'
        );
      case 'LibraryAdBreakClockItem':
        return (
          (item as { adBreak?: { scheduledStartTime?: string } }).adBreak
            ?.scheduledStartTime || '00:00'
        );
      default:
        return 'Unknown';
    }
  };

  const getItemBadgeColor = (item: ClockItem) => {
    switch (item.__typename) {
      case 'SubcategoryClockItem':
        return 'green';
      case 'GenreClockItem':
        return 'blue';
      case 'NoteClockItem':
      case 'LibraryNoteClockItem':
        return 'gray';
      case 'CommandClockItem':
      case 'LibraryCommandClockItem':
        return 'purple';
      case 'AdBreakClockItem':
      case 'LibraryAdBreakClockItem':
        return 'red';
      default:
        return 'blue';
    }
  };

  const Icon = getItemIcon(item);
  const badgeColor = getItemBadgeColor(item);

  return (
    <div className="clock-grid__row clock-grid__row--overlay">
      <div className="clock-grid__cell clock-grid__cell--air-time">
        <GripVerticalIcon className="clock-grid__drag-handle" size={16} />
        <span>--:--</span>
      </div>

      <div className="clock-grid__cell clock-grid__cell--type">
        <Badge
          color={badgeColor}
          size="sm"
          before={<Icon size={16} />}
          style={
            {
              '--badge-color':
                item.__typename === 'SubcategoryClockItem'
                  ? `var(--subcategory-color, var(--green-500))`
                  : undefined,
            } as React.CSSProperties
          }
        >
          {getItemTypeLabel(item)}
        </Badge>
      </div>

      <div className="clock-grid__cell clock-grid__cell--title">
        {getItemTitle(item)}
      </div>

      <div className="clock-grid__cell clock-grid__cell--artist">--</div>

      <div className="clock-grid__cell clock-grid__cell--duration">
        {formatDuration(Math.floor(Math.abs(item.duration)))}
      </div>

      <div className="clock-grid__cell clock-grid__cell--item-id">
        {item.id.slice(-6)}
      </div>

      <div className="clock-grid__cell clock-grid__cell--actions">•••</div>
    </div>
  );
};

const clockFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  color: z.string().refine(isValidHexColor, 'Must be a valid hex color'),
  targetRuntime: z.number().min(1, 'Target runtime must be greater than 0'),
});

type ClockFormData = z.infer<typeof clockFormSchema>;

type MusicClock = NonNullable<GetMusicClockQuery['musicClock']>;
type ClockItem = MusicClock['items'][number];

interface ClockEditorProps {
  clock?: MusicClock;
}

export const ClockEditor = ({ clock }: ClockEditorProps) => {
  const { currentNetwork } = useNetwork();
  const isEditing = !!clock;

  const [clockItems, setClockItems] = useState<ClockItem[]>(clock?.items || []);
  const [isClockDialogOpen, setIsClockDialogOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<ClockItem | null>(null);
  const [overId, setOverId] = useState<string | null>(null);

  const [updateClock, { loading: updateLoading }] =
    useMutation(UPDATE_MUSIC_CLOCK);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Convert ClockItem to MusicClockItemInput for API
  const convertClockItemToInput = useCallback(
    (item: ClockItem): MusicClockItemInput => {
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


  // Save clock items with specific data (for fresh state)
  const saveClockItemsWithData = useCallback(async (itemsToSave: ClockItem[]) => {
    if (!clock?.id || !isEditing) return;

    try {
      const items = itemsToSave.map(convertClockItemToInput);
      const result = await updateClock({
        variables: {
          input: {
            id: clock.id,
            items,
          },
        },
        onError: (error) => {
          console.error('Failed to save clock items:', error);
          toast('Failed to save changes', 'error');
        },
      });

      // Update local state with new IDs from the API response, but preserve local changes
      if (result.data?.updateMusicClock?.clock?.items) {
        const updatedItems = result.data.updateMusicClock.clock.items;
        
        // Only update if the lengths match to avoid duplication
        setClockItems(current => {
          if (current.length === updatedItems.length) {
            return updatedItems;
          }
          return current;
        });
      }
    } catch (error) {
      console.error('Error saving clock items:', error);
      toast('Failed to save changes', 'error');
    }
  }, [clock?.id, convertClockItemToInput, isEditing, updateClock]);

  // Auto-save when clock items change
  // useEffect(() => {
  //   if (clockItems.length === 0 && clock?.items?.length === 0) {
  //     // Skip saving on initial load
  //     return;
  //   }

  //   const timeoutId = setTimeout(() => {
  //     saveClockItems();
  //   }, 500); // Debounce saves by 500ms

  //   return () => clearTimeout(timeoutId);
  // }, [clockItems, saveClockItems, clock?.items?.length]);

  const methods = useForm<ClockFormData>({
    resolver: zodResolver(clockFormSchema),
    defaultValues: {
      name: clock?.name || '',
      description: clock?.description || '',
      color: clock?.color || getDefaultClockColor(),
      targetRuntime: clock?.targetRuntime || 3600,
    },
  });

  // Helper to create ClockItem from library data
  const createClockItemFromLibraryData = useCallback(
    (itemType: string, data: Record<string, unknown>, orderIndex: number): ClockItem => {
      const baseId = `temp-${Date.now()}-${Math.random()}`;
      const baseProps = {
        id: baseId,
        clockId: clock?.id || '',
        orderIndex,
        duration: Number(data.duration) || 0,
      };

      switch (itemType) {
        case 'track':
          return {
            ...baseProps,
            __typename: 'TrackClockItem',
            track: {
              __typename: 'Track',
              id: data.trackId as string,
              title: (data.name as string) || 'Unknown Track',
            },
          } as ClockItem;
        case 'subcategory':
          return {
            ...baseProps,
            __typename: 'SubcategoryClockItem',
            subcategory: {
              __typename: 'Subcategory',
              id: data.subcategoryId as string,
              name: data.name as string,
            },
          } as ClockItem;
        case 'genre':
          return {
            ...baseProps,
            __typename: 'GenreClockItem',
            genre: {
              __typename: 'Genre',
              id: data.genreId as string,
              name: data.name as string,
            },
          } as ClockItem;
        case 'note':
        case 'library_note':
          return {
            ...baseProps,
            __typename: 'LibraryNoteClockItem',
            note: {
              __typename: 'MusicClockLibraryNote',
              id: data.libraryItemId as string,
              duration: Number(data.duration) || 0,
              label: data.name as string,
              content: data.content as string,
            },
          } as ClockItem;
        case 'command':
        case 'library_command':
          return {
            ...baseProps,
            __typename: 'LibraryCommandClockItem',
            libraryCommand: {
              __typename: 'MusicClockLibraryCommand',
              id: data.libraryItemId as string,
              duration: Number(data.duration) || 0,
              command: data.command as string,
            },
          } as ClockItem;
        case 'ad_break':
        case 'library_ad_break':
          return {
            ...baseProps,
            __typename: 'LibraryAdBreakClockItem',
            adBreak: {
              __typename: 'MusicClockLibraryAdBreak',
              id: data.libraryItemId as string,
              duration: Number(data.duration) || 180,
              scheduledStartTime: data.scheduledStartTime as string,
            },
          } as ClockItem;
        default:
          console.warn('Unknown item type:', itemType);
          return {
            ...baseProps,
            __typename: 'NoteClockItem',
            content: 'Unknown item',
            duration: 0,
          } as ClockItem;
      }
    },
    [clock?.id],
  );

  // Helper to create temp item for drag preview
  const createTempItemFromLibraryData = useCallback(
    (itemType: string, data: Record<string, unknown>): ClockItem => {
      return createClockItemFromLibraryData(itemType, data, 0);
    },
    [createClockItemFromLibraryData],
  );

  const handleAddItem = useCallback(
    (itemType: string, data: Record<string, unknown>, position?: number) => {
      const newItem = createClockItemFromLibraryData(itemType, data, position ?? clockItems.length);

      let finalItems: ClockItem[];
      
      if (position !== undefined && position < clockItems.length) {
        // Insert at specific position
        const newItems = [...clockItems];
        newItems.splice(position, 0, newItem);
        // Update order indices
        finalItems = newItems.map((item, index) => ({
          ...item,
          orderIndex: index,
        }));
      } else {
        // Add to end
        finalItems = [...clockItems, newItem];
      }
      
      // Update local state optimistically
      setClockItems(finalItems);
      
      // Save to server
      setTimeout(() => saveClockItemsWithData(finalItems), 100);
    },
    [clockItems, createClockItemFromLibraryData, saveClockItemsWithData],
  );


  const handleItemEdit = useCallback((item: ClockItem) => {
    // TODO: Implement item edit dialog
    console.log('Edit item:', item);
  }, []);

  const handleItemDelete = useCallback((itemId: string) => {
    setClockItems((prev) => {
      const filtered = prev.filter((item) => item.id !== itemId);
      const reindexed = filtered.map((item, index) => ({
        ...item,
        orderIndex: index,
      }));
      
      // Save after deletion with fresh data
      setTimeout(() => saveClockItemsWithData(reindexed), 100);
      
      return reindexed;
    });
  }, [saveClockItemsWithData]);

  const handleItemReorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      setClockItems((prev) => {
        const newItems = arrayMove(prev, fromIndex, toIndex);
        return newItems.map((item, index) => ({
          ...item,
          orderIndex: index,
        }));
      });
    },
    [],
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      
      // Handle library item drags
      if (active.data.current?.type === 'library-item') {
        const { itemType, data } = active.data.current;
        
        // Create a temporary item for preview
        const tempItem = createTempItemFromLibraryData(itemType, data);
        setActiveItem(tempItem);
      } else {
        // Handle clock item drags
        const item = clockItems.find((item) => item.id === active.id);
        setActiveItem(item || null);
      }
    },
    [clockItems, createTempItemFromLibraryData],
  );

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { over } = event;
    setOverId(over ? String(over.id) : null);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      // Handle library item drops
      if (active.data.current?.type === 'library-item') {
        const { itemType, data } = active.data.current;

        if (over?.id && over.id !== active.id) {
          // Find the drop position
          const overIndex = clockItems.findIndex((item) => item.id === over.id);
          handleAddItem(itemType, data, overIndex >= 0 ? overIndex : undefined);
        } else {
          // Drop at end
          handleAddItem(itemType, data);
        }
      }
      // Handle clock item reordering
      else if (active.id !== over?.id && over?.id) {
        setClockItems((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over?.id);

          if (oldIndex === -1 || newIndex === -1) return items;

          const newItems = arrayMove(items, oldIndex, newIndex);
          const reorderedItems = newItems.map((item, index) => ({
            ...item,
            orderIndex: index,
          }));
          
          // Save after reordering with fresh data
          setTimeout(() => {
            saveClockItemsWithData(reorderedItems);
          }, 100);
          
          return reorderedItems;
        });
      }
      
      setActiveItem(null);
      setOverId(null);
    },
    [handleAddItem, clockItems, saveClockItemsWithData],
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
  const targetRuntime = methods.watch('targetRuntime') || 3600;
  const runtimeDiff = calculateRuntimeDifference(targetRuntime, totalDuration);

  return (
    <FormProvider {...methods}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="clock-editor">
          {/* Left Sidebar - Library */}
          <div className="clock-editor__sidebar">
            <ClockItemLibrary onAddItem={handleAddItem} />
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
                      {...methods.register('name')}
                      placeholder="Enter clock name"
                    />

                    <Textarea
                      label="Description"
                      {...methods.register('description')}
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
                            {...methods.register('color')}
                            className="w-12 h-10 rounded border border-gray-300"
                          />
                          <Input
                            {...methods.register('color')}
                            placeholder="#FF6B6B"
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <Input
                        type="number"
                        label="Target Runtime (seconds)"
                        {...methods.register('targetRuntime', {
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
                        onClick={() =>
                          methods.handleSubmit(handleClockSubmit)()
                        }
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
              <SortableContext
                items={clockItems.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                <ClockGrid
                  items={clockItems}
                  onItemEdit={handleItemEdit}
                  onItemDelete={handleItemDelete}
                  onItemReorder={handleItemReorder}
                  onItemAdd={handleAddItem}
                  activeId={activeItem?.id}
                  overId={overId}
                />
              </SortableContext>
            </div>
          </div>

          <DragOverlay>
            {activeItem ? <DragOverlayContent item={activeItem} /> : null}
          </DragOverlay>

          {/* Floating Duration Bar */}
          <FloatingBar
            className={
              runtimeDiff.isOver
                ? 'floating-bar__overtime'
                : runtimeDiff.isUnder
                ? 'floating-bar__undertime'
                : ''
            }
          >
            <span className="floating-bar__label">Duration:</span>
            <span className="floating-bar__duration">
              {formatDuration(totalDuration)}
            </span>
            {!runtimeDiff.isPerfect && (
              <span className="floating-bar__label">
                ({runtimeDiff.isOver ? '+' : '-'}
                {formatDuration(runtimeDiff.difference)})
              </span>
            )}
          </FloatingBar>
        </div>
      </DndContext>
    </FormProvider>
  );
};

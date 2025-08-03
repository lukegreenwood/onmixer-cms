'use client';

import { useMutation } from '@apollo/client';
import { arrayMove } from '@dnd-kit/sortable';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, Input, Textarea, Badge } from '@soundwaves/components';
import { useState, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FloatingBar } from '@/components/common';
import {
  ClockIcon,
  EditIcon,
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

  const [updateClock, { loading: updateLoading }] =
    useMutation(UPDATE_MUSIC_CLOCK);


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

  // Save clock items to API
  const saveClockItems = useCallback(async (items: ClockItem[]) => {
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
  }, [clock?.id, convertClockItemToInput, isEditing, updateClock]);

  const methods = useForm<ClockFormData>({
    resolver: zodResolver(clockFormSchema),
    defaultValues: {
      name: clock?.name || '',
      description: clock?.description || '',
      color: clock?.color || getDefaultClockColor(),
      targetRuntime: clock?.targetRuntime || 3600,
    },
  });

  // Create a new clock item from library data
  const createClockItemFromLibraryData = useCallback(
    (itemType: string, data: Record<string, unknown>): ClockItem => {
      const baseId = `temp-${Date.now()}-${Math.random()}`;
      const baseProps = {
        id: baseId,
        clockId: clock?.id || '',
        orderIndex: clockItems.length,
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
    [clockItems.length, clock?.id],
  );

  const handleAddItem = useCallback(
    (itemType: string, data: Record<string, unknown>, position?: number) => {
      const newItem = createClockItemFromLibraryData(itemType, data);
      
      setClockItems((prev) => {
        let newItems: ClockItem[];
        
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
        
        // Save to API
        setTimeout(() => saveClockItems(itemsWithOrderIndex), 100);
        
        return itemsWithOrderIndex;
      });
    },
    [createClockItemFromLibraryData, saveClockItems],
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
      
      // Save to API
      setTimeout(() => saveClockItems(reindexed), 100);
      
      return reindexed;
    });
  }, [saveClockItems]);

  const handleItemReorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      setClockItems((prev) => {
        const newItems = arrayMove(prev, fromIndex, toIndex);
        const reorderedItems = newItems.map((item, index) => ({
          ...item,
          orderIndex: index,
        }));
        
        // Save to API
        setTimeout(() => saveClockItems(reorderedItems), 100);
        
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
  const targetRuntime = methods.watch('targetRuntime') || 3600;
  const runtimeDiff = calculateRuntimeDifference(targetRuntime, totalDuration);

  return (
    <FormProvider {...methods}>
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
                <ClockGrid
                  items={clockItems}
                  onItemEdit={handleItemEdit}
                  onItemDelete={handleItemDelete}
                  onItemReorder={handleItemReorder}
                  onItemAdd={handleAddItem}
                />
            </div>
          </div>

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
    </FormProvider>
  );
};
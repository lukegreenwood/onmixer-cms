'use client';

import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Dialog, Input, Textarea, Badge } from '@soundwaves/components';
import { useState, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FloatingBar } from '@/components/common';
import { ClockIcon, EditIcon } from '@/components/icons';
import { GetMusicClockQuery } from '@/graphql/__generated__/graphql';
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
  clock: MusicClock;
}

export const ClockEditor = ({ clock }: ClockEditorProps) => {
  const { currentNetwork } = useNetwork();
  const isEditing = !!clock;

  const [clockItems, setClockItems] = useState<ClockItem[]>(clock?.items || []);
  const [isClockDialogOpen, setIsClockDialogOpen] = useState(false);

  const [updateClock, { loading: updateLoading }] =
    useMutation(UPDATE_MUSIC_CLOCK);

  const methods = useForm<ClockFormData>({
    resolver: zodResolver(clockFormSchema),
    defaultValues: {
      name: clock?.name || '',
      description: clock?.description || '',
      color: clock?.color || getDefaultClockColor(),
      targetRuntime: clock?.targetRuntime || 3600,
    },
  });

  const handleAddItem = useCallback(
    (_itemType: string, data: Record<string, unknown>) => {
      const newItem: ClockItem = {
        id: `temp-${Date.now()}`,
        orderIndex: clockItems.length,
        duration: data.duration || 0,
        ...data,
      } as ClockItem;

      setClockItems((prev) => [...prev, newItem]);
    },
    [clockItems.length],
  );

  const handleItemEdit = useCallback((item: ClockItem) => {
    // TODO: Implement item edit dialog
    console.log('Edit item:', item);
  }, []);

  const handleItemDelete = useCallback((itemId: string) => {
    setClockItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const handleItemReorder = useCallback(
    (fromIndex: number, toIndex: number) => {
      setClockItems((prev) => {
        const newItems = [...prev];
        const [movedItem] = newItems.splice(fromIndex, 1);
        newItems.splice(toIndex, 0, movedItem);
        return newItems.map((item, index) => ({
          ...item,
          orderIndex: index,
        }));
      });
    },
    [],
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
                <Button variant="secondary" size="sm">
                  <EditIcon size={16} />
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
                      onClick={() => methods.handleSubmit(handleClockSubmit)()}
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

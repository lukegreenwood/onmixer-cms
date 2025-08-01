'use client';

import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea } from '@soundwaves/components';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ActionBar } from '@/components/blocks/ActionBar';
import { EntityEditForm } from '@/components/blocks/EntityEditForm';
import { ClockIcon } from '@/components/icons';
import { CREATE_MUSIC_CLOCK } from '@/graphql/mutations/createMusicClock';
import { UPDATE_MUSIC_CLOCK } from '@/graphql/mutations/updateMusicClock';
import { useNetwork } from '@/hooks';
import { toast } from '@/lib/toast';

import {
  calculateClockRuntime,
  calculateRuntimeDifference,
  formatDuration,
  getDefaultClockColor,
  isValidHexColor,
  isTrackClockItem,
  isSubcategoryClockItem,
  isGenreClockItem,
  isNoteClockItem,
} from '../utils';

import { ClockItemEditor } from './ClockItemEditor';

import type {
  MusicClock,
  MusicClockItem,
} from '../types';

const clockFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  color: z.string().refine(isValidHexColor, 'Must be a valid hex color'),
  targetRuntime: z.number().min(1, 'Target runtime must be greater than 0'),
});

type ClockFormData = z.infer<typeof clockFormSchema>;

interface ClockEditorProps {
  clock?: MusicClock;
}

export const ClockEditor = ({ clock }: ClockEditorProps) => {
  const { currentNetwork } = useNetwork();
  const router = useRouter();
  const isEditing = !!clock;

  const [clockItems, setClockItems] = useState<MusicClockItem[]>(
    clock?.items || [],
  );

  const [createClock, { loading: createLoading }] =
    useMutation(CREATE_MUSIC_CLOCK);
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


  // Helper function to convert clock items for GraphQL input
  const convertClockItemsForInput = (items: MusicClockItem[]) => {
    return items.map((item, index) => {
      // Base input structure required by GraphQL schema
      const baseInput = {
        name: item.name,
        orderIndex: index,
      };

      if (isTrackClockItem(item)) {
        return {
          ...baseInput,
          trackItem: {
            trackId: item.trackId,
          },
        };
      } else if (isSubcategoryClockItem(item)) {
        return {
          ...baseInput,
          subcategoryItem: {
            subcategoryId: item.subcategoryId,
            duration: Math.round(item.duration || 0),
          },
        };
      } else if (isGenreClockItem(item)) {
        return {
          ...baseInput,
          genreItem: {
            genreId: item.genreId,
            duration: Math.round(item.duration || 0),
          },
        };
      } else if (isNoteClockItem(item)) {
        return {
          ...baseInput,
          noteItem: {
            content: item.content,
            color: item.color || null,
          },
        };
      }

      return baseInput;
    });
  };

  const handleSubmit = useCallback(
    (data: ClockFormData) => {
      if (!currentNetwork?.id) {
        toast('Network not found', 'error');
        return;
      }

      const input = {
        ...data,
        networkId: currentNetwork.id,
        targetRuntime: Math.round(data.targetRuntime), // Ensure target runtime is an integer
        items: convertClockItemsForInput(clockItems),
      };

      if (isEditing) {
        // For updates, remove networkId as it's not supported in UpdateMusicClockInput
        const { networkId: _networkId, ...updateInput } = input;
        updateClock({
          variables: { input: { id: clock.id, ...updateInput } },
          onCompleted: (result) => {
            if (result.updateMusicClock.clock) {
              toast('Clock updated successfully', 'success');
              router.push(
                `/networks/${currentNetwork?.code}/music-scheduling/clocks`,
              );
            } else {
              toast('Failed to update clock', 'error');
            }
          },
          onError: () => {
            toast('Failed to update clock', 'error');
          },
        });
      } else {
        createClock({
          variables: { input },
          onCompleted: (result) => {
            if (result.createMusicClock.clock) {
              toast('Clock created successfully', 'success');
              router.push(
                `/networks/${currentNetwork?.code}/music-scheduling/clocks`,
              );
            } else {
              toast('Failed to create clock', 'error');
            }
          },
          onError: () => {
            toast('Failed to create clock', 'error');
          },
        });
      }
    },
    [
      clockItems,
      currentNetwork?.id,
      currentNetwork?.code,
      clock?.id,
      isEditing,
      createClock,
      updateClock,
      router,
    ],
  );

  const handleItemsChange = useCallback((newItems: MusicClockItem[]) => {
    setClockItems(newItems);
  }, []);

  const totalDuration = calculateClockRuntime(clockItems);
  const targetRuntime = methods.watch('targetRuntime') || 3600;
  const runtimeDiff = calculateRuntimeDifference(targetRuntime, totalDuration);

  const isDirty =
    methods.formState.isDirty ||
    clockItems.length !== (clock?.items?.length || 0);

  return (
    <FormProvider {...methods}>
      <div className="clock-editor">
        <EntityEditForm
          startSection={[
            <div key="basic-info" className="clock-editor__form">
              <div className="clock-editor__header">
                <div className="icon-text">
                  <ClockIcon className="icon" />
                  <h3 className="font-semibold">
                    {isEditing
                      ? `Edit Clock: ${clock.name}`
                      : 'Create New Clock'}
                  </h3>
                </div>
              </div>

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

              <div className="form-grid-2">
                <div className="form-field">
                  <label className="form-label">Color</label>
                  <div className="color-picker-field">
                    <input
                      type="color"
                      {...methods.register('color')}
                      className="color-picker-input"
                    />
                    <Input
                      {...methods.register('color')}
                      placeholder="#FF6B6B"
                      className="color-hex-input"
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

              <div className="card card--compact">
                <div className="clock-editor__duration-info">
                  <div className="runtime-display">
                    <div className="runtime-target">
                      Target: {formatDuration(targetRuntime)}
                    </div>
                    <div
                      className={`runtime-actual ${
                        runtimeDiff.isPerfect
                          ? 'runtime-perfect'
                          : runtimeDiff.isOver
                          ? 'runtime-overage'
                          : 'runtime-underage'
                      }`}
                    >
                      Actual: {formatDuration(totalDuration)}
                    </div>
                    {!runtimeDiff.isPerfect && (
                      <div
                        className={`runtime-difference ${
                          runtimeDiff.isOver
                            ? 'runtime-overage'
                            : 'runtime-underage'
                        }`}
                      >
                        ({runtimeDiff.isOver ? '+' : '-'}
                        {formatDuration(runtimeDiff.difference)},{' '}
                        {runtimeDiff.percentage}%)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>,

            <div key="clock-items" className="clock-editor__items">
              <div className="clock-editor__items-header">
                <h4 className="clock-editor__items-title">Clock Items</h4>
              </div>

              <div className="clock-editor__items-list">
                <ClockItemEditor
                  items={clockItems}
                  onItemsChange={handleItemsChange}
                />
              </div>
            </div>,
          ]}
          endSection={<div />}
        />

        <ActionBar unsavedChanges={isDirty}>
          {isDirty && (
            <Button variant="tertiary" onClick={() => methods.reset()}>
              Discard
            </Button>
          )}
          <Button
            variant="primary"
            onClick={() => methods.handleSubmit(handleSubmit)()}
            disabled={createLoading || updateLoading}
          >
            {isEditing ? 'Update Clock' : 'Create Clock'}
          </Button>
        </ActionBar>
      </div>
    </FormProvider>
  );
};

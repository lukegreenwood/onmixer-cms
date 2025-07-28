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
import { ClockItemType } from '@/graphql/__generated__/graphql';
import { CREATE_MUSIC_CLOCK } from '@/graphql/mutations/createMusicClock';
import { UPDATE_MUSIC_CLOCK } from '@/graphql/mutations/updateMusicClock';
import { useNetwork } from '@/hooks';
import { toast } from '@/lib/toast';

import { ClockItemEditor } from './ClockItemEditor';

import type { MusicClock, ClockItem } from '../types';

const clockFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  duration: z.number().min(1, 'Duration must be greater than 0'),
  isTemplate: z.boolean(),
});

type ClockFormData = z.infer<typeof clockFormSchema>;

interface ClockEditorProps {
  clock?: MusicClock;
}

export const ClockEditor = ({ clock }: ClockEditorProps) => {
  const { currentNetwork } = useNetwork();
  const router = useRouter();
  const isEditing = !!clock;

  const [clockItems, setClockItems] = useState(clock?.items || []);

  const [createClock, { loading: createLoading }] =
    useMutation(CREATE_MUSIC_CLOCK);
  const [updateClock, { loading: updateLoading }] =
    useMutation(UPDATE_MUSIC_CLOCK);

  const methods = useForm<ClockFormData>({
    resolver: zodResolver(clockFormSchema),
    defaultValues: {
      name: clock?.name || '',
      description: clock?.description || '',
      duration: clock?.duration || 3600,
      isTemplate: clock?.isTemplate ?? true,
    },
  });

  const handleSubmit = useCallback(
    (data: ClockFormData) => {
      if (!currentNetwork?.id) {
        toast('Network not found', 'error');
        return;
      }

      const input = {
        ...data,
        networkId: currentNetwork.id,
        items: clockItems.map((item, index) => ({
          ...item,
          orderIndex: index,
          type: (item.type || item.__typename || 'MUSIC_SLOT') as ClockItemType,
        })),
      };

      if (isEditing) {
        updateClock({
          variables: { input: { id: clock.id, ...input } },
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

  const handleItemsChange = useCallback((newItems: ClockItem[]) => {
    setClockItems(newItems);
  }, []);

  const totalDuration = clockItems.reduce(
    (total, item) => total + (item.duration || 0),
    0,
  );
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
                <Input
                  type="number"
                  label="Target Duration (seconds)"
                  {...methods.register('duration', { valueAsNumber: true })}
                />
                <div className="checkbox-field">
                  <input
                    type="checkbox"
                    id="isTemplate"
                    {...methods.register('isTemplate')}
                    className="checkbox-field__input"
                  />
                  <label htmlFor="isTemplate" className="checkbox-field__label">
                    Template Clock
                  </label>
                </div>
              </div>

              <div className="card card--compact">
                <div className="clock-editor__duration-info">
                  Total Duration: {Math.floor(totalDuration / 60)}:
                  {(totalDuration % 60).toString().padStart(2, '0')}
                  {methods.watch('duration') && (
                    <span
                      className={`duration-diff ${
                        totalDuration > methods.watch('duration')
                          ? 'duration-diff--over'
                          : 'duration-diff--under'
                      }`}
                    >
                      ({totalDuration > methods.watch('duration') ? '+' : ''}
                      {totalDuration - methods.watch('duration')}s)
                    </span>
                  )}
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

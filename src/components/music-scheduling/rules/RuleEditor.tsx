'use client';

import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Textarea, MultiSelect } from '@soundwaves/components';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ActionBar } from '@/components/blocks/ActionBar';
import { EntityEditForm } from '@/components/blocks/EntityEditForm';
import { AddIcon, DeleteIcon, MusicIcon } from '@/components/icons';
import { RuleBreakable, RuleType, RuleUnit } from '@/graphql/__generated__/graphql';
import { CREATE_MUSIC_RULE } from '@/graphql/mutations/createMusicRule';
import { useNetwork } from '@/hooks';
import { toast } from '@/lib/toast';

const ruleFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  ruleType: z.nativeEnum(RuleType),
  breakable: z.nativeEnum(RuleBreakable),
  value: z.number().min(1, 'Value must be greater than 0'),
  unit: z.nativeEnum(RuleUnit),
  priority: z.number().min(1).max(10),
  isActive: z.boolean(),
});

type RuleFormData = z.infer<typeof ruleFormSchema>;

interface TimeWindow {
  startHour: number;
  endHour: number;
  daysOfWeek: string[];
}

interface RuleEditorProps {
  ruleId?: string;
  rule?: {
    id: string;
    name: string;
    description?: string;
    ruleType: string;
    breakable: string;
    value: number;
    unit: string;
    priority: number;
    isActive: boolean;
    criteria?: {
      categories?: string[];
      genres?: string[];
      artists?: string[];
      tags?: string[];
      timeWindows?: TimeWindow[];
    };
  };
}

export const RuleEditor = ({ ruleId: _ruleId, rule }: RuleEditorProps) => {
  const { currentNetwork } = useNetwork();
  const router = useRouter();
  const isEditing = !!rule;

  const [criteria, setCriteria] = useState({
    categories: rule?.criteria?.categories || [],
    genres: rule?.criteria?.genres || [],
    artists: rule?.criteria?.artists || [],
    tags: rule?.criteria?.tags || [],
    timeWindows: rule?.criteria?.timeWindows || [],
  });

  const [createRule, { loading: createLoading }] = useMutation(CREATE_MUSIC_RULE);

  const methods = useForm<RuleFormData>({
    resolver: zodResolver(ruleFormSchema),
    defaultValues: {
      name: rule?.name || '',
      description: rule?.description || '',
      ruleType: (rule?.ruleType || RuleType.PrimaryArtistSeparation) as RuleType,
      breakable: (rule?.breakable || RuleBreakable.Unbreakable) as RuleBreakable,
      value: rule?.value || 30,
      unit: (rule?.unit || RuleUnit.Minutes) as RuleUnit,
      priority: rule?.priority || 5,
      isActive: rule?.isActive ?? true,
    },
  });

  const handleSubmit = useCallback((data: RuleFormData) => {
    if (!currentNetwork?.id) {
      toast('Network not found', 'error');
      return;
    }

    const input = {
      ...data,
      networkId: currentNetwork.id,
      criteria,
    };

    createRule({
      variables: { input },
      onCompleted: (result) => {
        if (result.createMusicRule.rule) {
          toast('Rule created successfully', 'success');
          router.push(`/networks/${currentNetwork?.code}/music-scheduling/rules`);
        } else {
          toast('Failed to create rule', 'error');
        }
      },
      onError: () => {
        toast('Failed to create rule', 'error');
      },
    });
  }, [criteria, currentNetwork?.id, currentNetwork?.code, createRule, router]);

  const addTimeWindow = useCallback(() => {
    const newWindow: TimeWindow = {
      startHour: 6,
      endHour: 18,
      daysOfWeek: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'],
    };
    setCriteria(prev => ({
      ...prev,
      timeWindows: [...prev.timeWindows, newWindow],
    }));
  }, []);

  const updateTimeWindow = useCallback((index: number, updatedWindow: TimeWindow) => {
    setCriteria(prev => ({
      ...prev,
      timeWindows: prev.timeWindows.map((window, i) => i === index ? updatedWindow : window),
    }));
  }, []);

  const removeTimeWindow = useCallback((index: number) => {
    setCriteria(prev => ({
      ...prev,
      timeWindows: prev.timeWindows.filter((_, i) => i !== index),
    }));
  }, []);

  const isDirty = methods.formState.isDirty;

  return (
    <FormProvider {...methods}>
      <div className="rule-editor">
        <EntityEditForm
          startSection={[
            <div key="basic-info" className="rule-editor__section">
              <div className="rule-editor__header">
                <MusicIcon className="icon icon--primary" />
                <h3 className="rule-editor__title">
                  {isEditing ? `Edit Rule: ${rule.name}` : 'Create New Rule'}
                </h3>
              </div>
              
              <Input
                label="Rule Name"
                {...methods.register('name')}
                placeholder="Enter rule name"
              />
              
              <Textarea
                label="Description"
                {...methods.register('description')}
                placeholder="Optional description"
                rows={2}
              />

              <div className="form-grid-2">
                <div className="form-field">
                  <label className="form-label">Rule Type</label>
                  <select
                    {...methods.register('ruleType')}
                    className="form-select"
                  >
                    <option value={RuleType.PrimaryArtistSeparation}>Primary Artist Separation</option>
                    <option value={RuleType.SecondaryArtistSeparation}>Secondary Artist Separation</option>
                    <option value={RuleType.RelatedArtistSeparation}>Related Artist Separation</option>
                    <option value={RuleType.TitleSeparation}>Title Separation</option>
                    <option value={RuleType.AudioItemSeparation}>Audio Item Separation</option>
                    <option value={RuleType.GenreFlow}>Genre Flow</option>
                    <option value={RuleType.GenreAdjacent}>Genre Adjacent</option>
                    <option value={RuleType.TempoFlow}>Tempo Flow</option>
                    <option value={RuleType.TempoAdjacent}>Tempo Adjacent</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">Breakable</label>
                  <select
                    {...methods.register('breakable')}
                    className="form-select"
                  >
                    <option value={RuleBreakable.Unbreakable}>Unbreakable</option>
                    <option value={RuleBreakable.Breakable}>Breakable</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-3">
                <Input
                  type="number"
                  label="Value"
                  {...methods.register('value', { valueAsNumber: true })}
                  min={1}
                />

                <div className="form-field">
                  <label className="form-label">Unit</label>
                  <select
                    {...methods.register('unit')}
                    className="form-select"
                  >
                    <option value={RuleUnit.Minutes}>Minutes</option>
                    <option value={RuleUnit.Hours}>Hours</option>
                    <option value={RuleUnit.Tracks}>Tracks</option>
                    <option value={RuleUnit.Plays}>Plays</option>
                  </select>
                </div>

                <Input
                  type="number"
                  label="Priority (1-10)"
                  {...methods.register('priority', { valueAsNumber: true })}
                  min={1}
                  max={10}
                />
              </div>

              <div className="checkbox-field">
                <input
                  type="checkbox"
                  id="isActive"
                  {...methods.register('isActive')}
                  className="mr-2"
                />
                <label htmlFor="isActive">Active Rule</label>
              </div>
            </div>,

            <div key="criteria" className="rule-editor__section">
              <h4 className="font-semibold">Rule Criteria</h4>

              <div className="form-grid-2">
                <MultiSelect
                  label="Categories"
                  value={criteria.categories}
                  onChange={(categories) => setCriteria(prev => ({ ...prev, categories }))}
                  options={[
                    { label: 'Current Hits', value: 'current' },
                    { label: 'Gold Hits', value: 'gold' },
                    { label: 'Deep Cuts', value: 'deep' },
                    { label: 'New Music', value: 'new' },
                  ]}
                  placeholder="Select categories"
                />

                <MultiSelect
                  label="Genres"
                  value={criteria.genres}
                  onChange={(genres) => setCriteria(prev => ({ ...prev, genres }))}
                  options={[
                    { label: 'Pop', value: 'pop' },
                    { label: 'Rock', value: 'rock' },
                    { label: 'Hip Hop', value: 'hiphop' },
                    { label: 'Country', value: 'country' },
                  ]}
                  placeholder="Select genres"
                />
              </div>

              <div className="rule-editor__time-windows">
                <div className="rule-editor__time-windows-header">
                  <h5 className="font-medium">Active Time Windows</h5>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addTimeWindow}
                    type="button"
                  >
                    <AddIcon className="button-icon button-icon--sm" />
                    Add Window
                  </Button>
                </div>

                {criteria.timeWindows.map((window, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="rule-editor__time-window-header">
                      <h6 className="font-medium">Time Window #{index + 1}</h6>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => removeTimeWindow(index)}
                        type="button"
                        className="button--danger"
                      >
                        <DeleteIcon className="icon" />
                      </Button>
                    </div>

                    <div className="form-grid-2">
                      <Input
                        type="number"
                        label="Start Hour"
                        value={window.startHour}
                        onChange={(e) => updateTimeWindow(index, {
                          ...window,
                          startHour: parseInt((e.target as HTMLInputElement).value),
                        })}
                        min={0}
                        max={23}
                      />

                      <Input
                        type="number"
                        label="End Hour"
                        value={window.endHour}
                        onChange={(e) => updateTimeWindow(index, {
                          ...window,
                          endHour: parseInt((e.target as HTMLInputElement).value),
                        })}
                        min={0}
                        max={23}
                      />
                    </div>

                    <MultiSelect
                      label="Days of Week"
                      value={window.daysOfWeek}
                      onChange={(daysOfWeek) => updateTimeWindow(index, {
                        ...window,
                        daysOfWeek,
                      })}
                      options={[
                        { label: 'Monday', value: 'MONDAY' },
                        { label: 'Tuesday', value: 'TUESDAY' },
                        { label: 'Wednesday', value: 'WEDNESDAY' },
                        { label: 'Thursday', value: 'THURSDAY' },
                        { label: 'Friday', value: 'FRIDAY' },
                        { label: 'Saturday', value: 'SATURDAY' },
                        { label: 'Sunday', value: 'SUNDAY' },
                      ]}
                      placeholder="Select days"
                    />
                  </div>
                ))}

                {criteria.timeWindows.length === 0 && (
                  <div className="rule-editor__empty-state">
                    <p>No time windows configured. Rule applies to all times.</p>
                  </div>
                )}
              </div>
            </div>
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
            disabled={createLoading}
          >
            {isEditing ? 'Update Rule' : 'Create Rule'}
          </Button>
        </ActionBar>
      </div>
    </FormProvider>
  );
};
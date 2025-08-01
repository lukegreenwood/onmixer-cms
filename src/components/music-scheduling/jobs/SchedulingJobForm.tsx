'use client';

// import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Switch } from '@soundwaves/components';
import { useState } from 'react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { z } from 'zod';

import { NetworkSelectorField } from '@/components/DynamicForm/fields/NetworkSelectorField';
import { ScheduleIcon } from '@/components/icons';
import { useNetwork } from '@/hooks';
import { toast } from '@/lib/toast';

import { SchedulePreview } from './SchedulePreview';

import type { MusicSchedule } from '../types';

const jobFormSchema = z.object({
  networkId: z.string().min(1, 'Network is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  dryRun: z.boolean(),
  playlistNameFormat: z.string().min(1, 'Playlist name format is required'),
  removePastPlaylists: z.boolean(),
  skipUnbreakableRules: z.boolean(),
});

type JobFormData = z.infer<typeof jobFormSchema>;

interface SchedulingJobFormProps {
  onJobComplete?: (schedules: MusicSchedule[]) => void;
}

export const SchedulingJobForm = ({ onJobComplete }: SchedulingJobFormProps) => {
  const { currentNetwork } = useNetwork();
  const [previewSchedules, setPreviewSchedules] = useState<MusicSchedule[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // This would be replaced with actual GraphQL mutation
  // const [runSchedulingJob] = useMutation(/* CREATE_SCHEDULING_JOB */);

  const methods = useForm<JobFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      networkId: currentNetwork?.id || '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
      dryRun: true, // default to dry run
      playlistNameFormat: 'y-m-d hh', // configurable format
      removePastPlaylists: true,
      skipUnbreakableRules: false,
    },
  });

  const watchDryRun = methods.watch('dryRun');

  const handleSubmit = async (data: JobFormData) => {
    setIsRunning(true);
    try {
      // Mock implementation - replace with actual GraphQL call
      const mockSchedules: MusicSchedule[] = [
        {
          id: '1',
          networkId: data.networkId,
          scheduledDate: data.startDate,
          hour: 0,
          clockId: 'clock-1',
          playlistName: 'Test Playlist',
          exportedToRadioDj: false,
          ruleViolations: [],
          items: [],
          clock: {
            id: 'clock-1',
            name: 'Morning Mix',
            color: '#FF6B6B',
            targetRuntime: 3600,
          },
        },
      ];

      if (data.dryRun) {
        setPreviewSchedules(mockSchedules);
        toast('Dry run completed successfully', 'success');
      } else {
        onJobComplete?.(mockSchedules);
        toast('Scheduling job completed successfully', 'success');
      }
    } catch {
      toast('Scheduling job failed', 'error');
    } finally {
      setIsRunning(false);
    }
  };

  const formatTokenExamples = [
    { token: 'y', description: 'Year (2024)' },
    { token: 'm', description: 'Month (01-12)' },
    { token: 'd', description: 'Day (01-31)' },
    { token: 'h', description: 'Hour (0-23)' },
    { token: 'mm', description: 'Month name (Jan)' },
    { token: 'dd', description: 'Day name (Mon)' },
    { token: 'HH', description: 'Hour (00-23)' },
  ];

  return (
    <FormProvider {...methods}>
      <div className="scheduling-job-form">
        <div className="scheduling-job-form__header">
          <div className="icon-text">
            <ScheduleIcon className="icon--primary" />
            <div>
              <h3 className="scheduling-job-form__title">
                {watchDryRun ? 'Preview Schedule Generation' : 'Generate Schedules'}
              </h3>
              <p className="scheduling-job-form__description">
                {watchDryRun 
                  ? 'Preview how schedules will be generated without making changes'
                  : 'Generate and deploy schedules to RadioDJ'
                }
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={methods.handleSubmit(handleSubmit)} className="scheduling-job-form__form">
          <div className="form-grid-2">
            <NetworkSelectorField
              name="networkId"
              label="Network"
              placeholder="Select network..."
              multiple={false}
            />

            <Controller
              name="dryRun"
              control={methods.control}
              render={({ field }) => (
                <Switch
                  label="Dry Run (Preview Only)"
                  checked={field.value}
                  onChange={field.onChange}
                  disabled={isRunning}
                  helperText="Preview changes without generating actual playlists"
                />
              )}
            />
          </div>

          <div className="form-grid-2">
            <Input
              type="date"
              label="Start Date"
              {...methods.register('startDate')}
              disabled={isRunning}
            />
            <Input
              type="date"
              label="End Date"
              {...methods.register('endDate')}
              disabled={isRunning}
            />
          </div>

          <div className="form-field">
            <Input
              label="Playlist Name Format"
              {...methods.register('playlistNameFormat')}
              placeholder="y-m-d hh"
              disabled={isRunning}
              helperText="Use tokens to format playlist names"
            />
            <div className="format-tokens">
              <div className="format-tokens__title">Available tokens:</div>
              <div className="format-tokens__list">
                {formatTokenExamples.map(({ token, description }) => (
                  <div key={token} className="format-token">
                    <code>{token}</code> - {description}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-grid-2">
            <Controller
              name="removePastPlaylists"
              control={methods.control}
              render={({ field }) => (
                <Switch
                  label="Remove Past Playlists"
                  checked={field.value}
                  onChange={field.onChange}
                  disabled={isRunning}
                  helperText="Delete existing playlists before generating new ones"
                />
              )}
            />

            <Controller
              name="skipUnbreakableRules"
              control={methods.control}
              render={({ field }) => (
                <Switch
                  label="Skip Unbreakable Rules (Dangerous!)"
                  checked={field.value}
                  onChange={field.onChange}
                  disabled={isRunning}
                  helperText="Force generation even if unbreakable rules are violated"
                />
              )}
            />
          </div>

          <div className="scheduling-job-form__actions">
            <Button
              type="submit"
              variant={watchDryRun ? 'secondary' : 'primary'}
              disabled={isRunning}
            >
              <ScheduleIcon className="button-icon" />
              {watchDryRun ? 'Preview Schedules' : 'Generate & Deploy'}
            </Button>
          </div>
        </form>

        {previewSchedules.length > 0 && (
          <div className="scheduling-job-form__preview">
            <SchedulePreview schedules={previewSchedules} />
          </div>
        )}
      </div>
    </FormProvider>
  );
};
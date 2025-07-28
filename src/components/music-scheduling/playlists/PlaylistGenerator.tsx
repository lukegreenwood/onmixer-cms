'use client';

import { useMutation, useQuery } from '@apollo/client';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DatePicker,
} from '@soundwaves/components';
import { parse } from 'date-fns';
import { useState, useCallback } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form';

import { Card } from '@/components/blocks/Card';
import { CheckboxField } from '@/components/DynamicForm/fields';
import { PlaylistsIcon } from '@/components/icons';
import { JobPriority, PlaylistStatus } from '@/graphql/__generated__/graphql';
import { START_MUSIC_SCHEDULING_JOB } from '@/graphql/mutations/assignMusicClock';
import { GET_MUSIC_PLAYLISTS } from '@/graphql/queries/musicAssignments';
import { useNetwork } from '@/hooks';
import { toast } from '@/lib/toast';

export const PlaylistGenerator = () => {
  const { currentNetwork } = useNetwork();

  type GenerationOptions = {
    startDate: string;
    endDate: string;
    regenerateExisting: boolean;
    respectLocks: boolean;
    dryRun: boolean;
    priority: JobPriority;
  };

  const defaultValues: GenerationOptions = {
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    regenerateExisting: false,
    respectLocks: true,
    dryRun: false,
    priority: JobPriority.Normal,
  };

  const methods = useForm<GenerationOptions>({
    defaultValues,
  });

  const [currentJob, setCurrentJob] = useState<string | null>(null);

  const [startJob, { loading: jobLoading }] = useMutation(
    START_MUSIC_SCHEDULING_JOB,
  );

  const { data: playlistsData, refetch: refetchPlaylists } = useQuery(
    GET_MUSIC_PLAYLISTS,
    {
      variables: {
        networkId: currentNetwork?.id || '',
        filters: {
          startDate: methods.watch('startDate'),
          endDate: methods.watch('endDate'),
        },
      },
    },
  );

  const handleGenerate = useCallback(
    (formData: GenerationOptions) => {
      if (!currentNetwork?.id) {
        toast('Network not found', 'error');
        return;
      }

      startJob({
        variables: {
          input: {
            networkId: currentNetwork.id,
            startDate: formData.startDate,
            endDate: formData.endDate,
            options: {
              regenerateExisting: formData.regenerateExisting,
              respectLocks: formData.respectLocks,
              dryRun: formData.dryRun,
              priority: formData.priority,
            },
          },
        },
        onCompleted: (result) => {
          if (result.startMusicSchedulingJob.job) {
            setCurrentJob(result.startMusicSchedulingJob.job.id);
            toast('Playlist generation started', 'success');

            // Poll for updates
            const pollInterval = setInterval(async () => {
              try {
                await refetchPlaylists();
              } catch (error) {
                console.error('Polling error:', error);
              }
            }, 2000);

            // Clear polling after 5 minutes
            setTimeout(() => {
              clearInterval(pollInterval);
              setCurrentJob(null);
            }, 300000);
          } else {
            toast('Failed to start playlist generation', 'error');
          }
        },
        onError: () => {
          toast('Failed to start playlist generation', 'error');
        },
      });
    },
    [currentNetwork?.id, startJob, refetchPlaylists],
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'GENERATED':
        return 'status-badge--active';
      case 'PENDING':
        return 'status-badge--warning';
      case 'LOCKED':
        return 'status-badge--template';
      case 'ERROR':
        return 'status-badge--unbreakable';
      default:
        return 'status-badge--inactive';
    }
  };

  return (
    <div className="playlist-generator">
      <Card>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleGenerate)}
            autoComplete="off"
          >
            <div className="playlist-generator__header">
              <div className="playlist-generator__title">
                <h2 className="playlist-generator__heading">
                  Playlist Generation
                </h2>
                <p className="playlist-generator__description">
                  Generate music playlists from clock assignments
                </p>
              </div>
            </div>

            <div className="playlist-generator__options">
              <div className="playlist-generator__section">
                <h3 className="section-title">Generation Options</h3>

                <div className="form-grid-2">
                  <Controller
                    name="startDate"
                    control={methods.control}
                    render={({ field }) => (
                      <DatePicker
                        label="Start Date"
                        value={
                          field.value
                            ? parse(field.value, 'yyyy-MM-dd', new Date())
                            : undefined
                        }
                        onChange={(value) => {
                          if (value) {
                            field.onChange(value.toString());
                          }
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="endDate"
                    control={methods.control}
                    render={({ field }) => (
                      <DatePicker
                        label="End Date"
                        value={
                          field.value
                            ? parse(field.value, 'yyyy-MM-dd', new Date())
                            : undefined
                        }
                        onChange={(value) => {
                          if (value) {
                            field.onChange(value.toString());
                          }
                        }}
                      />
                    )}
                  />
                </div>

                <div className="checkbox-group">
                  <div className="checkbox-field">
                    <CheckboxField
                      name="regenerateExisting"
                      label="Regenerate Existing Playlists"
                    />
                  </div>
                  <div className="checkbox-field">
                    <CheckboxField
                      name="respectLocks"
                      label="Respect Locked Playlists"
                    />
                  </div>
                  <div className="checkbox-field">
                    <CheckboxField
                      name="dryRun"
                      label="Dry Run (Preview Only)"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Priority</label>
                  <Controller
                    name="priority"
                    control={methods.control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={JobPriority.Low}>
                            Low Priority
                          </SelectItem>
                          <SelectItem value={JobPriority.Normal}>
                            Normal Priority
                          </SelectItem>
                          <SelectItem value={JobPriority.High}>
                            High Priority
                          </SelectItem>
                          <SelectItem value={JobPriority.Urgent}>
                            Urgent
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={currentJob !== null || jobLoading}
                  variant="primary"
                  before={<PlaylistsIcon />}
                >
                  {currentJob ? 'Generating...' : 'Generate Playlists'}
                </Button>
              </div>

              <div className="playlist-generator__section">
                <h3 className="section-title">Generation Status</h3>

                {currentJob ? (
                  <div className="status-card status-card--active">
                    <div className="status-card__header">
                      <div className="spinner"></div>
                      <span className="status-card__title">
                        Generating playlists...
                      </span>
                    </div>
                    <p className="status-card__meta">Job ID: {currentJob}</p>
                  </div>
                ) : (
                  <div className="status-card status-card--inactive">
                    <p className="status-card__message">
                      No active generation job
                    </p>
                  </div>
                )}

                <div className="stats-card">
                  <h4 className="stats-card__title">Quick Stats</h4>
                  <div className="stats-list">
                    <div className="stats-item">
                      <span>Total Playlists:</span>
                      <span>{playlistsData?.musicPlaylists?.length || 0}</span>
                    </div>
                    <div className="stats-item">
                      <span>Generated:</span>
                      <span>
                        {playlistsData?.musicPlaylists?.filter(
                          (p) => p.status === PlaylistStatus.Scheduled,
                        ).length || 0}
                      </span>
                    </div>
                    <div className="stats-item">
                      <span>Locked:</span>
                      <span>
                        {playlistsData?.musicPlaylists?.filter(
                          (p) => p.isLocked,
                        ).length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>

        {playlistsData?.musicPlaylists &&
          playlistsData.musicPlaylists.length > 0 && (
            <div>
              <h3 className="section-title">Generated Playlists</h3>
              <div className="playlist-grid">
                {playlistsData.musicPlaylists.map((playlist) => (
                  <div key={playlist.id} className="playlist-card">
                    <div className="playlist-card__header">
                      <div className="playlist-card__info">
                        <h4 className="playlist-card__title">
                          {playlist.clock?.name}
                        </h4>
                        <p className="playlist-card__meta">
                          {formatDate(playlist.scheduledDate)} at{' '}
                          {playlist.scheduledHour}:00
                        </p>
                      </div>
                      <span
                        className={`status-badge ${getStatusBadgeClass(
                          playlist.status,
                        )}`}
                      >
                        {playlist.status}
                      </span>
                    </div>

                    <div className="playlist-card__stats">
                      <div className="stats-item">
                        <span>Items:</span>
                        <span>{playlist.items?.length || 0}</span>
                      </div>
                      <div className="stats-item">
                        <span>Duration:</span>
                        <span>
                          {Math.floor((playlist.totalDuration || 0) / 60)}min
                        </span>
                      </div>
                      {playlist.ruleViolations &&
                        playlist.ruleViolations.length > 0 && (
                          <div className="stats-item stats-item--error">
                            <span>Violations:</span>
                            <span>{playlist.ruleViolations.length}</span>
                          </div>
                        )}
                      {playlist.isLocked && (
                        <div className="playlist-card__lock">🔒 Locked</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </Card>
    </div>
  );
};

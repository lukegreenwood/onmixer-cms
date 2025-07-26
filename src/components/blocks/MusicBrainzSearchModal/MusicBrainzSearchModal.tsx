'use client';

import { useLazyQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Dialog, Badge, Checkbox } from '@soundwaves/components';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React, { useState, useMemo, useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { DataTable } from '@/components';
import type { SearchMusicBrainzQuery } from '@/graphql/__generated__/graphql';
import { SEARCH_MUSICBRAINZ } from '@/graphql/queries/tracks';

const searchSchema = z.object({
  artist: z.string().min(1, 'Artist is required'),
  title: z.string().min(1, 'Title is required'),
  album: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).default(10),
  preferSingles: z.boolean().default(true),
});

type SearchForm = z.infer<typeof searchSchema>;

// Flattened release type for table display
type FlattenedRelease = {
  recordingId: string;
  title: string;
  artist: string;
  album: string;
  country?: string | null;
  releaseType?: string | null;
  date?: string | null;
  score: number;
  releaseScore?: number | null;
  // Keep original data for selection
  originalRecording: SearchMusicBrainzQuery['searchMusicBrainz'][0];
  originalRelease: SearchMusicBrainzQuery['searchMusicBrainz'][0]['releases'][0];
};

interface MusicBrainzSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (
    recording: SearchMusicBrainzQuery['searchMusicBrainz'][0],
    release: SearchMusicBrainzQuery['searchMusicBrainz'][0]['releases'][0],
  ) => void;
  initialValues?: {
    artist?: string;
    title?: string;
    album?: string;
  };
}

const columnHelper = createColumnHelper<FlattenedRelease>();

export function MusicBrainzSearchModal({
  isOpen,
  onClose,
  onSelect,
  initialValues,
}: MusicBrainzSearchModalProps) {
  const [searchResults, setSearchResults] = useState<FlattenedRelease[]>([]);

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      artist: initialValues?.artist || '',
      title: initialValues?.title || '',
      album: initialValues?.album || '',
      limit: 10,
      preferSingles: true,
    },
    mode: 'onChange',
  });

  const [searchMusicBrainz, { loading: searchLoading }] =
    useLazyQuery(SEARCH_MUSICBRAINZ);

  const handleSearch = async (data: SearchForm) => {
    try {
      const result = await searchMusicBrainz({
        variables: {
          input: {
            title: data.title,
            artist: data.artist,
            album: data.album || undefined,
            limit: data.limit,
            preferSingles: data.preferSingles,
          },
        },
      });

      if (result.data?.searchMusicBrainz) {
        // Flatten the results - each release becomes a separate row
        const flattened: FlattenedRelease[] = [];

        result.data.searchMusicBrainz.forEach((recording) => {
          recording.releases.forEach((release) => {
            flattened.push({
              recordingId: recording.id,
              title: recording.title,
              artist: recording.artist,
              album: release.album,
              country: release.country,
              releaseType: release.releaseType,
              date: release.date,
              score: recording.score,
              releaseScore: release.score,
              originalRecording: recording,
              originalRelease: release,
            });
          });
        });

        setSearchResults(flattened);
      }
    } catch (error) {
      console.error('MusicBrainz search error:', error);
    }
  };

  const handleSelectResult = useCallback(
    (result: FlattenedRelease) => {
      onSelect(result.originalRecording, result.originalRelease);
      onClose();
    },
    [onSelect, onClose],
  );

  const handleClose = () => {
    setSearchResults([]);
    form.reset();
    onClose();
  };

  // Table columns definition
  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      }),
      columnHelper.accessor('title', {
        header: 'Title',
        cell: (info) => <div className="font-medium">{info.getValue()}</div>,
      }),
      columnHelper.accessor((row) => row.originalRecording.artists, {
        header: 'Artists',
        cell: (info) =>
          info.getValue().reduce((acc, artist, index, array) => {
            if (index === 0) {
              return artist.name;
            }

            const prev = array[index - 1];

            if (prev && prev.joinPhrase) {
              return `${acc}${prev.joinPhrase}${artist.name}`;
            }

            return `${acc}, ${artist.name}`;
          }, ''),
      }),
      columnHelper.accessor('album', {
        header: 'Album',
        cell: (info) => info.getValue() || '—',
      }),
      columnHelper.accessor('releaseType', {
        header: 'Release Type',
        cell: (info) => (
          <Badge color="gray" size="sm">
            {info.getValue() || 'Unknown'}
          </Badge>
        ),
      }),
      columnHelper.accessor('country', {
        header: 'Country',
        cell: (info) => info.getValue() || '—',
      }),
      columnHelper.accessor('date', {
        header: 'Release Date',
        cell: (info) => {
          const date = info.getValue();
          if (!date) return '—';
          try {
            return new Date(date).toLocaleDateString('en-GB', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });
          } catch {
            return date;
          }
        },
      }),
      columnHelper.accessor('score', {
        header: 'Recording Score',
        cell: (info) => {
          const score = Math.round(info.getValue());
          return (
            <Badge
              color={score >= 80 ? 'green' : score >= 60 ? 'yellow' : 'gray'}
            >
              {score}%
            </Badge>
          );
        },
      }),
      columnHelper.accessor('releaseScore', {
        header: 'Release Score',
        cell: (info) => {
          const score = info.getValue();
          if (score === null || score === undefined) return '—';
          const roundedScore = Math.round(score);
          return (
            <Badge
              color={
                roundedScore >= 80
                  ? 'green'
                  : roundedScore >= 60
                  ? 'yellow'
                  : 'gray'
              }
            >
              {roundedScore}%
            </Badge>
          );
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <Button size="sm" onClick={() => handleSelectResult(row.original)}>
            Select
          </Button>
        ),
      }),
    ],
    [handleSelectResult],
  );

  const table = useReactTable({
    data: searchResults,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <Dialog.Overlay />
      <Dialog.Content className="musicbrainz-search-modal" dismissable>
        <Dialog.Title>Search MusicBrainz</Dialog.Title>

        <div className="musicbrainz-search-modal__body">
          <form
            onSubmit={form.handleSubmit(handleSearch)}
            className="musicbrainz-search-modal__form"
          >
            <div className="musicbrainz-search-modal__form-fields">
              <div className="musicbrainz-search-modal__form-row">
                <Input
                  label="Artist"
                  placeholder="Enter artist name..."
                  {...form.register('artist')}
                  helperText={form.formState.errors.artist?.message}
                  destructive={!!form.formState.errors.artist}
                />

                <Input
                  label="Title"
                  placeholder="Enter song title..."
                  {...form.register('title')}
                  helperText={form.formState.errors.title?.message}
                  destructive={!!form.formState.errors.title}
                />
              </div>

              <div className="musicbrainz-search-modal__form-row">
                <Input
                  label="Album"
                  placeholder="Enter album name (optional)..."
                  {...form.register('album')}
                  helperText={form.formState.errors.album?.message}
                  destructive={!!form.formState.errors.album}
                />

                <Input
                  label="Limit"
                  type="number"
                  min="1"
                  max="100"
                  {...form.register('limit', { valueAsNumber: true })}
                  helperText={form.formState.errors.limit?.message}
                  destructive={!!form.formState.errors.limit}
                />
              </div>

              <div className="musicbrainz-search-modal__form-row">
                <Controller
                  control={form.control}
                  name="preferSingles"
                  render={({ field }) => (
                    <Checkbox
                      label="Prefer Singles"
                      checked={field.value}
                      onCheckedChange={(value) => {
                        field.onChange(
                          value === 'indeterminate' ? false : value,
                        );
                      }}
                      helperText={form.formState.errors.preferSingles?.message}
                    />
                  )}
                />
              </div>
            </div>

            <Button type="submit" disabled={searchLoading}>
              {searchLoading ? 'Searching...' : 'Search'}
            </Button>
          </form>

          {searchResults.length > 0 && (
            <div className="musicbrainz-search-modal__results">
              <div className="musicbrainz-search-modal__results-header">
                <h3>Search Results ({searchResults.length} releases found)</h3>
              </div>
              <div className="musicbrainz-search-modal__results-table">
                <DataTable
                  table={table}
                  className="musicbrainz-search-modal__table"
                />
              </div>
            </div>
          )}
        </div>

        <div className="musicbrainz-search-modal__footer">
          <Dialog.Close asChild>
            <Button variant="secondary">Cancel</Button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

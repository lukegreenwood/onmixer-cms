'use client';

import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Dialog } from '@soundwaves/components';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import type { MusicBrainzSearchResult } from '@/graphql/__generated__/graphql';
import { SEARCH_MUSICBRAINZ } from '@/graphql/queries/tracks';

const searchSchema = z.object({
  artist: z.string().min(1, 'Artist is required'),
  title: z.string().min(1, 'Title is required'),
  album: z.string().optional(),
});

type SearchForm = z.infer<typeof searchSchema>;

interface MusicBrainzSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (result: MusicBrainzSearchResult) => void;
  initialValues?: {
    artist?: string;
    title?: string;
    album?: string;
  };
}

export function MusicBrainzSearchModal({
  isOpen,
  onClose,
  onSelect,
  initialValues,
}: MusicBrainzSearchModalProps) {
  const [searchResults, setSearchResults] = useState<MusicBrainzSearchResult[]>(
    [],
  );

  const form = useForm<SearchForm>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      artist: initialValues?.artist || '',
      title: initialValues?.title || '',
      album: initialValues?.album || '',
    },
  });

  const [searchMusicBrainz, { loading: searchLoading }] =
    useMutation(SEARCH_MUSICBRAINZ);

  const handleSearch = async (data: SearchForm) => {
    try {
      const result = await searchMusicBrainz({
        variables: {
          artist: data.artist,
          title: data.title,
        },
      });

      if (result.data?.searchMusicBrainz) {
        setSearchResults(result.data.searchMusicBrainz as MusicBrainzSearchResult[]);
      }
    } catch (error) {
      console.error('MusicBrainz search error:', error);
    }
  };

  const handleSelectResult = (result: MusicBrainzSearchResult) => {
    onSelect(result);
    onClose();
  };

  const handleClose = () => {
    setSearchResults([]);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <Dialog.Content className="musicbrainz-search-modal">
        <Dialog.Title>Search MusicBrainz</Dialog.Title>
        
        <div className="musicbrainz-search-modal__body">
          <form
            onSubmit={form.handleSubmit(handleSearch)}
            className="musicbrainz-search-modal__form"
          >
            <div className="musicbrainz-search-modal__form-fields">
              <Input
                label="Artist"
                placeholder="Enter artist name..."
                {...form.register('artist')}
                helperText={form.formState.errors.artist?.message}
              />

              <Input
                label="Title"
                placeholder="Enter song title..."
                {...form.register('title')}
                helperText={form.formState.errors.title?.message}
              />

              <Input
                label="Album"
                placeholder="Enter album name (optional)..."
                {...form.register('album')}
                helperText={form.formState.errors.album?.message}
              />
            </div>

            <Button type="submit" disabled={searchLoading}>
              {searchLoading ? 'Searching...' : 'Search'}
            </Button>
          </form>

          {searchResults.length > 0 && (
            <div className="musicbrainz-search-modal__results">
              <h3>Search Results</h3>
              <div className="musicbrainz-search-modal__results-list">
                {searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="musicbrainz-search-modal__result-item"
                  >
                    <div className="musicbrainz-search-modal__result-content">
                      <div className="musicbrainz-search-modal__result-title">
                        {result.title}
                      </div>
                      <div className="musicbrainz-search-modal__result-artist">
                        {result.artist}
                      </div>
                      <div className="musicbrainz-search-modal__result-score">
                        Score: {result.score}%
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleSelectResult(result)}
                    >
                      Select
                    </Button>
                  </div>
                ))}
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
'use client';

import { useLazyQuery } from '@apollo/client';
import { Input } from '@soundwaves/components';
import { useState } from 'react';

import {
  AudioIcon,
  NoteIcon,
  AdIcon,
  CategoryIcon,
  SearchIcon,
  GripVerticalIcon,
  CommandIcon,
  GenreIcon,
  ChevronRightIcon,
} from '@/components/icons';
import type {
  GetCategoriesQuery,
  GetGenresQuery,
  SearchTracksV2Query,
} from '@/graphql/__generated__/graphql';
import { GET_CATEGORIES } from '@/graphql/queries/categories';
import { GET_GENRES } from '@/graphql/queries/genres';
import { SEARCH_TRACKS_V2 } from '@/graphql/queries/tracks';

interface ClockItemLibraryProps {
  onAddItem: (itemType: string, data: Record<string, unknown>) => void;
}

type LibraryView = 'main' | 'audio' | 'categories' | 'genres';

export const ClockItemLibrary = ({
  onAddItem: _onAddItem,
}: ClockItemLibraryProps) => {
  const [currentView, setCurrentView] = useState<LibraryView>('main');
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<
    GetCategoriesQuery['categories']
  >([]);
  const [genres, setGenres] = useState<GetGenresQuery['genresV2']['items']>([]);
  const [tracks, setTracks] = useState<
    SearchTracksV2Query['tracksV2']['items']
  >([]);

  const [fetchCategories] = useLazyQuery(GET_CATEGORIES, {
    onCompleted: (data) => setCategories(data.categories),
  });

  const [fetchGenres] = useLazyQuery(GET_GENRES, {
    onCompleted: (data) => setGenres(data.genresV2.items),
  });

  const [fetchTracks] = useLazyQuery(SEARCH_TRACKS_V2, {
    onCompleted: (data) => setTracks(data.tracksV2.items),
  });

  const handleViewChange = (view: LibraryView) => {
    setCurrentView(view);
    setSearchTerm('');

    if (view === 'categories') {
      fetchCategories();
    } else if (view === 'genres') {
      fetchGenres();
    } else if (view === 'audio') {
      fetchTracks({ variables: { filters: { limit: 50 } } });
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    if (currentView === 'audio' && term.trim()) {
      fetchTracks({
        variables: {
          filters: {
            limit: 50,
            search: term,
          },
        },
      });
    } else if (currentView === 'genres' && term.trim()) {
      fetchGenres({
        variables: {
          filters: {
            limit: 50,
            search: term,
          },
        },
      });
    }
    // Categories don't need search as they are fetched all at once and filtered client-side
  };

  const handleDragStart = (
    e: React.DragEvent,
    itemType: string,
    data: Record<string, unknown>,
  ) => {
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({ itemType, data }),
    );
    e.dataTransfer.effectAllowed = 'move';
  };

  const mainLibraryItems = [
    {
      id: 'audio',
      title: 'Audio',
      icon: AudioIcon,
      description: 'Music tracks',
      onClick: () => handleViewChange('audio'),
    },
    {
      id: 'notes',
      title: 'Notes',
      icon: NoteIcon,
      description: 'Text notes',
      draggable: true,
      onDragStart: (e: React.DragEvent) =>
        handleDragStart(e, 'note', {
          content: 'New Note',
          name: 'Note',
          duration: 0,
        }),
    },
    {
      id: 'commands',
      title: 'Commands',
      icon: CommandIcon,
      description: 'System commands',
      draggable: true,
      onDragStart: (e: React.DragEvent) =>
        handleDragStart(e, 'command', {
          command: 'FADE_IN',
          name: 'Command',
          duration: 0,
        }),
    },
    {
      id: 'categories',
      title: 'Categories',
      icon: CategoryIcon,
      description: 'Music categories',
      onClick: () => handleViewChange('categories'),
    },
    {
      id: 'adbreaks',
      title: 'Ad Breaks',
      icon: AdIcon,
      description: 'Commercial breaks',
      draggable: true,
      onDragStart: (e: React.DragEvent) =>
        handleDragStart(e, 'adbreak', {
          scheduledStartTime: '00:00',
          name: 'Commercial',
          duration: 180,
        }),
    },
    {
      id: 'genres',
      title: 'Genres',
      icon: GenreIcon,
      description: 'Music genres',
      onClick: () => handleViewChange('genres'),
    },
  ];

  const renderMainView = () => (
    <div className="clock-item-library__items">
      {mainLibraryItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="clock-item-library__item"
            onClick={item.onClick}
            draggable={item.draggable}
            onDragStart={item.onDragStart}
          >
            <div className="clock-item-library__item-icon">
              <Icon size={20} />
            </div>
            <div className="clock-item-library__item-content">
              <div className="clock-item-library__item-title">{item.title}</div>
              <div className="clock-item-library__item-description">
                {item.description}
              </div>
            </div>
            {item.draggable ? (
              <div className="clock-item-library__item-drag">
                <GripVerticalIcon size={16} />
              </div>
            ) : (
              <div className="clock-item-library__item-drag">
                <ChevronRightIcon size={24} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderSearchView = (
    title: string,
    items: unknown[],
    onItemDrag: (item: unknown) => void,
  ) => (
    <>
      <div className="clock-item-library__search">
        <div className="search-input">
          <SearchIcon className="search-input__icon" size={16} />
          <Input
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input__field"
          />
        </div>
      </div>
      <div className="clock-item-library__items clock-item-library__items--scrollable">
        {items.map((item) => (
          <div
            key={item.id}
            className="clock-item-library__item clock-item-library__item--draggable"
            draggable
            onDragStart={(e) =>
              (onItemDrag as (item: unknown) => (e: React.DragEvent) => void)(
                item,
              )(e)
            }
            style={
              {
                '--item-background-color':
                  currentView === 'categories' ? item.color : undefined,
              } as React.CSSProperties
            }
          >
            <div className="clock-item-library__item-icon">
              {currentView === 'audio' && <AudioIcon size={16} />}
              {currentView === 'categories' && <CategoryIcon size={16} />}
              {currentView === 'genres' && <GenreIcon size={16} />}
            </div>
            <div className="clock-item-library__item-content">
              <div className="clock-item-library__item-title">
                {currentView === 'audio' && `${item.artist} - ${item.title}`}
                {currentView === 'categories' && item.name}
                {currentView === 'genres' && item.name}
              </div>
              {currentView === 'audio' && (
                <div className="clock-item-library__item-description">
                  {item.duration?.formatted || '0:00'}
                </div>
              )}
            </div>
            <div className="clock-item-library__item-drag">
              <GripVerticalIcon size={16} />
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const handleAudioDrag = (
    track: SearchTracksV2Query['tracksV2']['items'][0],
  ) => {
    return (e: React.DragEvent) =>
      handleDragStart(e, 'track', {
        trackId: track.id,
        name: `${track.artist} - ${track.title}`,
        duration: track.duration?.raw || 0,
      });
  };

  const handleCategoryDrag = (
    subcategory: GetCategoriesQuery['categories'][0]['subcategories'][0],
  ) => {
    return (e: React.DragEvent) =>
      handleDragStart(e, 'subcategory', {
        subcategoryId: subcategory.id,
        name: subcategory.name,
        duration: subcategory.averageDuration?.raw || 180,
      });
  };

  const handleGenreDrag = (genre: GetGenresQuery['genresV2']['items'][0]) => {
    return (e: React.DragEvent) =>
      handleDragStart(e, 'genre', {
        genreId: genre.id,
        name: genre.name,
        duration: 180,
      });
  };

  const getAllSubcategories = () => {
    const allSubcategories = categories.flatMap((cat) => cat.subcategories);
    if (!searchTerm.trim()) return allSubcategories;

    return allSubcategories.filter((sub) =>
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  const getFilteredGenres = () => {
    if (!searchTerm.trim()) return genres;

    return genres.filter((genre) =>
      genre.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  const getFilteredTracks = () => {
    if (!searchTerm.trim()) return tracks;

    return tracks.filter(
      (track) =>
        track.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.artist?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  return (
    <div className="clock-item-library">
      <div className="clock-item-library__header">
        {currentView !== 'main' && (
          <button
            className="clock-item-library__back"
            onClick={() => setCurrentView('main')}
          >
            ← Back
          </button>
        )}
        <h3>
          {currentView === 'main' && 'Library'}
          {currentView === 'audio' && 'Audio'}
          {currentView === 'categories' && 'Categories'}
          {currentView === 'genres' && 'Genres'}
        </h3>
      </div>

      {currentView === 'main' && renderMainView()}
      {currentView === 'audio' &&
        renderSearchView('tracks', getFilteredTracks(), handleAudioDrag)}
      {currentView === 'categories' &&
        renderSearchView(
          'categories',
          getAllSubcategories(),
          handleCategoryDrag,
        )}
      {currentView === 'genres' &&
        renderSearchView('genres', getFilteredGenres(), handleGenreDrag)}
    </div>
  );
};

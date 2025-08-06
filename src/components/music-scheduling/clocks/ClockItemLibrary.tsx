'use client';

import { useLazyQuery, useMutation } from '@apollo/client';
import { useDebouncedCallback } from '@tanstack/react-pacer';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { Input, Button, Dialog } from '@soundwaves/components';
import clsx from 'clsx';
import { useState } from 'react';

import {
  MusicIcon,
  NoteIcon,
  CommandIcon,
  AdIcon,
  CategoryIcon,
  GenreIcon,
  SearchIcon,
  AddIcon,
  DeleteIcon,
  AudioIcon,
  ChevronRightIcon,
  GripVerticalIcon,
} from '@/components/icons';
import type {
  GetCategoriesQuery,
  GetGenresQuery,
  SearchTracksV2Query,
  GetMusicClockItemLibraryQuery,
  UniversalClockItemSearchQuery,
} from '@/graphql/__generated__/graphql';
import {
  MusicClockLibraryItemType,
  TrackFilterType,
  TrackTextFilterField,
  TextFilterOperator,
  OperatorType,
  GenreFilterType,
  GenreTextFilterField,
} from '@/graphql/__generated__/graphql';
import {
  CREATE_MUSIC_CLOCK_LIBRARY_ITEM,
  DELETE_MUSIC_CLOCK_LIBRARY_ITEM,
} from '@/graphql/mutations/musicClockLibraryItem';
import { GET_CATEGORIES } from '@/graphql/queries/categories';
import { GET_GENRES } from '@/graphql/queries/genres';
import { GET_MUSIC_CLOCK_ITEM_LIBRARY } from '@/graphql/queries/musicClockItemLibrary';
import { SEARCH_TRACKS_V2 } from '@/graphql/queries/tracks';
import { UNIVERSAL_CLOCK_ITEM_SEARCH } from '@/graphql/queries/universalClockItemSearch';
import { useNetwork } from '@/hooks';
import { toast } from '@/lib/toast';

import { getContrastColor } from './utils';

interface ClockItemLibraryProps {
  onAddItem?: (itemType: string, data: Record<string, unknown>) => void;
}

interface DraggableLibraryItemProps {
  id: string;
  itemType: string;
  data: Record<string, unknown>;
  icon: React.ComponentType<{ size: number }>;
  title: string;
  description?: string;
  onDelete?: () => void;
  style?: React.CSSProperties;
  className?: string;
}

function DraggableLibraryItem({
  id,
  itemType,
  data,
  icon: Icon,
  title,
  description,
  onDelete,
  style,
  className,
}: DraggableLibraryItemProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: {
      type: 'library-item',
      itemType,
      data,
    },
  });

  // For library items, we don't want to apply transform (keeps original in place)
  // The drag overlay will handle the visual feedback

  return (
    <div
      ref={setNodeRef}
      className={clsx(
        `clock-item-library__item clock-item-library__item--draggable`,
        className,
      )}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="clock-item-library__item-icon">
        <Icon size={16} />
      </div>
      <div className="clock-item-library__item-content">
        <div className="clock-item-library__item-title">{title}</div>
        {description && (
          <div className="clock-item-library__item-description">
            {description}
          </div>
        )}
      </div>
      <div className="clock-item-library__item-actions">
        {onDelete && (
          <Button
            variant="transparent"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            size="xs-icon"
            isIconOnly
            destructive
          >
            <DeleteIcon size={14} />
          </Button>
        )}
        <div className="clock-item-library__drag-handle">
          <GripVerticalIcon size={14} />
        </div>
      </div>
    </div>
  );
}

type LibraryView =
  | 'main'
  | 'universal-search'
  | 'audio'
  | 'categories'
  | 'category-detail'
  | 'genres'
  | 'notes'
  | 'commands'
  | 'adbreaks';
type LibraryItemType = MusicClockLibraryItemType;

export const ClockItemLibrary = ({ onAddItem }: ClockItemLibraryProps) => {
  const { currentNetwork } = useNetwork();
  const { setNodeRef, isOver, active } = useDroppable({
    id: 'library',
  });
  const [currentView, setCurrentView] = useState<LibraryView>('main');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState<
    GetCategoriesQuery['categories'][0] | null
  >(null);
  const [categories, setCategories] = useState<
    GetCategoriesQuery['categories']
  >([]);
  const [genres, setGenres] = useState<GetGenresQuery['genresV2']['items']>([]);
  const [tracks, setTracks] = useState<
    SearchTracksV2Query['tracksV2']['items']
  >([]);
  const [libraryItems, setLibraryItems] = useState<
    GetMusicClockItemLibraryQuery['musicClockItemLibrary']['items']
  >([]);
  const [universalSearchResults, setUniversalSearchResults] = useState<
    UniversalClockItemSearchQuery | null
  >(null);
  const [universalSearchTerm, setUniversalSearchTerm] = useState('');
  const [isUniversalSearchLoading, setIsUniversalSearchLoading] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newItemType, setNewItemType] = useState<LibraryItemType>(
    MusicClockLibraryItemType.Note,
  );
  const [newItemName, setNewItemName] = useState('');
  const [newItemContent, setNewItemContent] = useState('');

  const [fetchCategories] = useLazyQuery(GET_CATEGORIES, {
    onCompleted: (data) => setCategories(data.categories),
  });

  const [fetchGenres] = useLazyQuery(GET_GENRES, {
    onCompleted: (data) => setGenres(data.genresV2.items),
  });

  const [fetchTracks] = useLazyQuery(SEARCH_TRACKS_V2, {
    onCompleted: (data) => setTracks(data.tracksV2.items),
  });

  const [fetchLibraryItems] = useLazyQuery(GET_MUSIC_CLOCK_ITEM_LIBRARY, {
    onCompleted: (data) => setLibraryItems(data.musicClockItemLibrary.items),
  });

  const [fetchUniversalSearch] = useLazyQuery(UNIVERSAL_CLOCK_ITEM_SEARCH, {
    onCompleted: (data) => {
      setUniversalSearchResults(data);
      setIsUniversalSearchLoading(false);
    },
    onError: () => {
      setIsUniversalSearchLoading(false);
    },
  });

  const [createLibraryItem] = useMutation(CREATE_MUSIC_CLOCK_LIBRARY_ITEM);
  const [deleteLibraryItem] = useMutation(DELETE_MUSIC_CLOCK_LIBRARY_ITEM);

  // Debounced universal search
  const debouncedUniversalSearch = useDebouncedCallback(
    (searchTerm: string) => {
      if (!currentNetwork?.id) return;
      
      if (searchTerm.trim()) {
        setIsUniversalSearchLoading(true);
        fetchUniversalSearch({
          variables: {
            searchTerm: searchTerm.trim(),
            networkId: currentNetwork.id,
            limit: 15,
          },
        });
      } else {
        setUniversalSearchResults(null);
        setIsUniversalSearchLoading(false);
      }
    },
    {
      wait: 300,
      trailing: true,
    }
  );

  const handleUniversalSearch = (term: string) => {
    setUniversalSearchTerm(term);
    if (term.trim()) {
      setCurrentView('universal-search');
      debouncedUniversalSearch(term);
    } else {
      setCurrentView('main');
      setUniversalSearchResults(null);
    }
  };

  const handleViewChange = (view: LibraryView) => {
    setCurrentView(view);
    setSearchTerm('');

    // Reset universal search when changing views
    if (view !== 'universal-search') {
      setUniversalSearchTerm('');
      setUniversalSearchResults(null);
    }

    // Reset category when leaving category views
    if (view !== 'categories' && view !== 'category-detail') {
      setCurrentCategory(null);
    }

    if (view === 'categories') {
      fetchCategories();
    } else if (view === 'genres') {
      fetchGenres({ variables: { filters: { limit: 50 } } });
    } else if (view === 'audio') {
      fetchTracks({ variables: { filters: { limit: 50 } } });
    } else if (['notes', 'commands', 'adbreaks'].includes(view)) {
      const typeMap = {
        notes: MusicClockLibraryItemType.Note,
        commands: MusicClockLibraryItemType.Command,
        adbreaks: MusicClockLibraryItemType.AdBreak,
      };
      if (currentNetwork?.id) {
        fetchLibraryItems({
          variables: {
            networkId: currentNetwork.id,
            type: typeMap[view as keyof typeof typeMap],
          },
        });
      }
    }
  };

  const handleCategoryClick = (
    category: GetCategoriesQuery['categories'][0],
  ) => {
    setCurrentCategory(category);
    setCurrentView('category-detail');
    setSearchTerm('');
  };

  const refetchLibraryItems = () => {
    if (!currentNetwork?.id) return;

    const typeMap = {
      notes: MusicClockLibraryItemType.Note,
      commands: MusicClockLibraryItemType.Command,
      adbreaks: MusicClockLibraryItemType.AdBreak,
    };

    if (['notes', 'commands', 'adbreaks'].includes(currentView)) {
      fetchLibraryItems({
        variables: {
          networkId: currentNetwork.id,
          type: typeMap[currentView as keyof typeof typeMap],
        },
      });
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    if (currentView === 'audio') {
      if (term.trim()) {
        fetchTracks({
          variables: {
            filters: {
              limit: 50,
              filterGroup: {
                operator: OperatorType.Or,
                filters: [
                  {
                    type: TrackFilterType.Text,
                    textFilter: {
                      field: TrackTextFilterField.Title,
                      operator: TextFilterOperator.Contains,
                      value: term,
                    },
                  },
                  {
                    type: TrackFilterType.Text,
                    textFilter: {
                      field: TrackTextFilterField.Artist,
                      operator: TextFilterOperator.Contains,
                      value: term,
                    },
                  },
                ],
              },
            },
          },
        });
      } else {
        fetchTracks({ variables: { filters: { limit: 50 } } });
      }
    } else if (currentView === 'genres') {
      if (term.trim()) {
        fetchGenres({
          variables: {
            filters: {
              limit: 50,
              filterGroup: {
                operator: OperatorType.And,
                filters: [
                  {
                    type: GenreFilterType.Text,
                    textFilter: {
                      field: GenreTextFilterField.Name,
                      operator: TextFilterOperator.Contains,
                      value: term,
                    },
                  },
                ],
              },
            },
          },
        });
      } else {
        fetchGenres({ variables: { filters: { limit: 50 } } });
      }
    }
  };

  const handleCreateLibraryItem = async () => {
    if (!currentNetwork?.id || !newItemName.trim()) return;

    try {
      const baseInput = {
        networkId: currentNetwork.id,
        label: newItemName,
        itemType: newItemType,
        duration:
          newItemType === MusicClockLibraryItemType.AdBreak
            ? parseInt(newItemContent) || 180
            : 180,
      };

      const input = {
        ...baseInput,
        ...(newItemType === MusicClockLibraryItemType.Note && {
          content: newItemContent,
        }),
        ...(newItemType === MusicClockLibraryItemType.Command && {
          command: newItemContent,
        }),
        ...(newItemType === MusicClockLibraryItemType.AdBreak && {
          scheduledStartTime: newItemContent,
        }),
      };

      await createLibraryItem({
        variables: { input },
        refetchQueries: ['GetMusicClockItemLibrary'],
        onCompleted: () => {
          toast('Library item created successfully', 'success');
          setIsCreateDialogOpen(false);
          setNewItemName('');
          setNewItemContent('');
          refetchLibraryItems();
        },
        onError: () => {
          toast('Failed to create library item', 'error');
        },
      });
    } catch {
      toast('Failed to create library item', 'error');
    }
  };

  const handleDeleteLibraryItem = async (itemId: string) => {
    try {
      await deleteLibraryItem({
        variables: { id: itemId },
        refetchQueries: ['GetMusicClockItemLibrary'],
        onCompleted: () => {
          toast('Library item deleted successfully', 'success');
          refetchLibraryItems();
        },
        onError: () => {
          toast('Failed to delete library item', 'error');
        },
      });
    } catch {
      toast('Failed to delete library item', 'error');
    }
  };

  const mainLibraryItems = [
    {
      id: 'audio',
      title: 'Audio',
      icon: MusicIcon,
      description: 'Music tracks',
      onClick: () => handleViewChange('audio'),
    },
    {
      id: 'notes',
      title: 'Notes',
      icon: NoteIcon,
      description: 'Text notes',
      onClick: () => handleViewChange('notes'),
    },
    {
      id: 'commands',
      title: 'Commands',
      icon: CommandIcon,
      description: 'System commands',
      onClick: () => handleViewChange('commands'),
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
      onClick: () => handleViewChange('adbreaks'),
    },
    {
      id: 'genres',
      title: 'Genres',
      icon: GenreIcon,
      description: 'Music genres',
      onClick: () => handleViewChange('genres'),
    },
  ];

  const renderUniversalSearchResults = () => {
    if (!universalSearchResults) return null;

    const { tracksV2, genresV2, subcategories, libraryNotes, libraryCommands, libraryAdBreaks } = universalSearchResults;

    // Filter library items to only include the correct types (server-side search already applied)
    const filteredLibraryNotes = libraryNotes.items.filter(item => 
      item.__typename === 'MusicClockLibraryNote'
    );
    const filteredLibraryCommands = libraryCommands.items.filter(item => 
      item.__typename === 'MusicClockLibraryCommand'
    );
    const filteredLibraryAdBreaks = libraryAdBreaks.items.filter(item => 
      item.__typename === 'MusicClockLibraryAdBreak'
    );

    const hasResults = tracksV2.items.length > 0 || genresV2.items.length > 0 ||
                      subcategories.length > 0 || filteredLibraryNotes.length > 0 ||
                      filteredLibraryCommands.length > 0 || filteredLibraryAdBreaks.length > 0;

    return (
      <div className="clock-item-library__items clock-item-library__items--scrollable">
        {isUniversalSearchLoading && (
          <div className="clock-item-library__loading">Searching...</div>
        )}
        
        {!isUniversalSearchLoading && !hasResults && (
          <div className="clock-item-library__no-results">
            No results found for "{universalSearchTerm}"
          </div>
        )}

        {/* Tracks */}
        {tracksV2.items.length > 0 && (
          <>
            <div className="clock-item-library__group-header">
              <AudioIcon size={16} />
              <span>Tracks ({tracksV2.items.length})</span>
            </div>
            {tracksV2.items.map((track) => {
              const trackData = {
                trackId: track.id,
                name: `${track.artist} - ${track.title}`,
                duration: track.duration?.raw || 0,
                artist: track.artist,
              };
              return (
                <DraggableLibraryItem
                  key={track.id}
                  id={`search-track-${track.id}`}
                  itemType="track"
                  data={trackData}
                  icon={AudioIcon}
                  title={`${track.artist} - ${track.title}`}
                  description={track.duration?.formatted || '0:00'}
                />
              );
            })}
          </>
        )}

        {/* Genres */}
        {genresV2.items.length > 0 && (
          <>
            <div className="clock-item-library__group-header">
              <GenreIcon size={16} />
              <span>Genres ({genresV2.items.length})</span>
            </div>
            {genresV2.items.map((genre) => {
              const genreData = {
                genreId: genre.id,
                name: genre.name,
                duration: 180,
              };
              return (
                <DraggableLibraryItem
                  key={genre.id}
                  id={`search-genre-${genre.id}`}
                  itemType="genre"
                  data={genreData}
                  icon={GenreIcon}
                  title={genre.name}
                />
              );
            })}
          </>
        )}

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <>
            <div className="clock-item-library__group-header">
              <CategoryIcon size={16} />
              <span>Categories ({subcategories.length})</span>
            </div>
            {subcategories.map((subcategory) => {
              const subcategoryData = {
                subcategoryId: subcategory.id,
                name: subcategory.name,
                duration: subcategory.averageDuration?.raw || 0,
                color: subcategory.color,
              };
              const subcategoryStyle = {
                '--item-background-color': subcategory?.color || undefined,
              } as React.CSSProperties;
              return (
                <DraggableLibraryItem
                  key={subcategory.id}
                  id={`search-subcategory-${subcategory.id}`}
                  itemType="subcategory"
                  data={subcategoryData}
                  icon={CategoryIcon}
                  title={subcategory.name}
                  description={
                    subcategory.averageDuration?.formatted
                      ? `~${subcategory.averageDuration.formatted}`
                      : ''
                  }
                  className={
                    subcategory?.color
                      ? `clock-item-library__item--${getContrastColor(subcategory.color)}`
                      : undefined
                  }
                  style={subcategoryStyle}
                />
              );
            })}
          </>
        )}

        {/* Library Notes */}
        {filteredLibraryNotes.length > 0 && (
          <>
            <div className="clock-item-library__group-header">
              <NoteIcon size={16} />
              <span>Library Notes ({filteredLibraryNotes.length})</span>
            </div>
            {filteredLibraryNotes.map((item) => {
              if (item.__typename !== 'MusicClockLibraryNote') return null;
              const dragData = {
                libraryItemId: item.id,
                name: item.label || item.id,
                duration: 0,
                content: item.content || '',
              };
              return (
                <DraggableLibraryItem
                  key={item.id}
                  id={`search-library-note-${item.id}`}
                  itemType="library_note"
                  data={dragData}
                  icon={NoteIcon}
                  title={item.label || item.id}
                  onDelete={() => handleDeleteLibraryItem(item.id)}
                />
              );
            })}
          </>
        )}

        {/* Library Commands */}
        {filteredLibraryCommands.length > 0 && (
          <>
            <div className="clock-item-library__group-header">
              <CommandIcon size={16} />
              <span>Library Commands ({filteredLibraryCommands.length})</span>
            </div>
            {filteredLibraryCommands.map((item) => {
              if (item.__typename !== 'MusicClockLibraryCommand') return null;
              const dragData = {
                libraryItemId: item.id,
                name: item.label || item.id,
                duration: item.duration || 0,
                command: item.command || '',
              };
              return (
                <DraggableLibraryItem
                  key={item.id}
                  id={`search-library-command-${item.id}`}
                  itemType="library_command"
                  data={dragData}
                  icon={CommandIcon}
                  title={item.label || item.id}
                  description={item.command}
                  onDelete={() => handleDeleteLibraryItem(item.id)}
                />
              );
            })}
          </>
        )}

        {/* Library Ad Breaks */}
        {filteredLibraryAdBreaks.length > 0 && (
          <>
            <div className="clock-item-library__group-header">
              <AdIcon size={16} />
              <span>Library Ad Breaks ({filteredLibraryAdBreaks.length})</span>
            </div>
            {filteredLibraryAdBreaks.map((item) => {
              if (item.__typename !== 'MusicClockLibraryAdBreak') return null;
              const dragData = {
                libraryItemId: item.id,
                name: `Ad Break (${item.duration}s)`,
                duration: item.duration || 180,
                scheduledStartTime: item.scheduledStartTime || '00:00',
              };
              return (
                <DraggableLibraryItem
                  key={item.id}
                  id={`search-library-adbreak-${item.id}`}
                  itemType="library_ad_break"
                  data={dragData}
                  icon={AdIcon}
                  title={`Ad Break`}
                  description={`${item.duration || 180}s`}
                  onDelete={() => handleDeleteLibraryItem(item.id)}
                />
              );
            })}
          </>
        )}
      </div>
    );
  };

  const renderMainView = () => (
    <div className="clock-item-library__items">
      {mainLibraryItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id as string}
            className="clock-item-library__item"
            onClick={item.onClick}
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
            <div className="clock-item-library__item-action">
              <ChevronRightIcon size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderLibraryView = (title: string, type: LibraryItemType) => {
    return (
      <>
        <div className="clock-item-library__search">
          <div className="search-input">
            <SearchIcon className="search-input__icon" size={16} />
            <Input
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) =>
                handleSearch((e.target as HTMLInputElement).value)
              }
              className="search-input__field"
            />
          </div>
        </div>

        <div className="clock-item-library__actions">
          <button
            className="clock-item-library__action-item"
            onClick={() => {
              let itemType = '';
              let data: Record<string, unknown> = {};

              if (type === MusicClockLibraryItemType.Note) {
                itemType = 'note';
                data = {
                  name: `Clock-specific Note`,
                  duration: 0,
                  content: 'New note',
                };
              } else if (type === MusicClockLibraryItemType.Command) {
                itemType = 'command';
                data = {
                  name: `Clock-specific Command`,
                  duration: 0,
                  command: 'FADE_IN',
                };
              } else if (type === MusicClockLibraryItemType.AdBreak) {
                itemType = 'ad_break';
                data = {
                  name: `Clock-specific Ad Break`,
                  duration: 180,
                  scheduledStartTime: '00:00',
                };
              }

              onAddItem?.(itemType, data);
            }}
          >
            <div className="clock-item-library__action-icon">
              <AddIcon size={16} />
            </div>
            <div className="clock-item-library__action-content">
              <div className="clock-item-library__action-title">
                Add Clock-Specific {title.slice(0, -1)}
              </div>
              <div className="clock-item-library__action-description">
                Create a one-time item for this clock only
              </div>
            </div>
          </button>
        </div>

        <div className="clock-item-library__items clock-item-library__items--scrollable">
          {libraryItems
            .filter(
              (item) =>
                !searchTerm ||
                ('label' in item ? (item.label as string) : (item.id as string))
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()),
            )
            .map((item) => {
              let itemType = '';
              let dragData: Record<string, unknown> = {};

              if (type === MusicClockLibraryItemType.Note) {
                itemType = 'library_note';
                dragData = {
                  libraryItemId: item.id,
                  name: 'label' in item ? item.label : item.id,
                  duration: 0,
                  content: 'content' in item ? item.content : '',
                };
              } else if (type === MusicClockLibraryItemType.Command) {
                itemType = 'library_command';
                dragData = {
                  libraryItemId: item.id,
                  name: 'label' in item ? item.label : item.id,
                  duration: item.duration || 0,
                  command: 'command' in item ? item.command : '',
                };
              } else if (type === MusicClockLibraryItemType.AdBreak) {
                itemType = 'library_ad_break';
                dragData = {
                  libraryItemId: item.id,
                  name: 'label' in item ? item.label : item.id,
                  duration: item.duration || 180,
                  scheduledStartTime:
                    'scheduledStartTime' in item
                      ? item.scheduledStartTime
                      : '00:00',
                };
              }

              let icon = NoteIcon;
              if (type === MusicClockLibraryItemType.Command) {
                icon = CommandIcon;
              } else if (type === MusicClockLibraryItemType.AdBreak) {
                icon = AdIcon;
              }

              let description = '';
              if (
                type === MusicClockLibraryItemType.Command &&
                'command' in item &&
                item.command
              ) {
                description = item.command;
              } else if (type === MusicClockLibraryItemType.AdBreak) {
                description = `${item.duration || 180}s`;
              }

              return (
                <DraggableLibraryItem
                  key={item.id as string}
                  id={`library-${item.id}`}
                  itemType={itemType}
                  data={dragData}
                  icon={icon}
                  title={'label' in item ? item.label : item.id}
                  description={description}
                  onDelete={() => handleDeleteLibraryItem(item.id)}
                />
              );
            })}
        </div>
      </>
    );
  };

  const renderAudioView = () => (
    <>
      <div className="clock-item-library__search">
        <div className="search-input">
          <SearchIcon className="search-input__icon" size={16} />
          <Input
            placeholder="Search tracks..."
            value={searchTerm}
            onChange={(e) => handleSearch((e.target as HTMLInputElement).value)}
            className="search-input__field"
          />
        </div>
      </div>
      <div className="clock-item-library__items clock-item-library__items--scrollable">
        {tracks.map((track) => {
          const trackData = {
            trackId: track.id,
            name: `${track.artist} - ${track.title}`,
            duration: track.duration?.raw || 0,
          };
          return (
            <DraggableLibraryItem
              key={track.id}
              id={`track-${track.id}`}
              itemType="track"
              data={trackData}
              icon={AudioIcon}
              title={`${track.artist} - ${track.title}`}
              description={track.duration?.formatted || '0:00'}
            />
          );
        })}
      </div>
    </>
  );

  const renderGenresView = () => (
    <>
      <div className="clock-item-library__search">
        <div className="search-input">
          <SearchIcon className="search-input__icon" size={16} />
          <Input
            placeholder="Search genres..."
            value={searchTerm}
            onChange={(e) => handleSearch((e.target as HTMLInputElement).value)}
            className="search-input__field"
          />
        </div>
      </div>
      <div className="clock-item-library__items clock-item-library__items--scrollable">
        {genres.map((genre) => {
          const genreData = {
            genreId: genre.id,
            name: genre.name,
            duration: 180,
          };
          return (
            <DraggableLibraryItem
              key={genre.id}
              id={`genre-${genre.id}`}
              itemType="genre"
              data={genreData}
              icon={GenreIcon}
              title={genre.name}
            />
          );
        })}
      </div>
    </>
  );

  const renderCategoriesView = () => (
    <>
      <div className="clock-item-library__search">
        <div className="search-input">
          <SearchIcon className="search-input__icon" size={16} />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm((e.target as HTMLInputElement).value)
            }
            className="search-input__field"
          />
        </div>
      </div>
      <div className="clock-item-library__items clock-item-library__items--scrollable">
        {categories
          .filter(
            (category) =>
              !searchTerm ||
              category.name.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map((category) => (
            <div
              key={category.id}
              className="clock-item-library__item"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="clock-item-library__item-icon">
                <CategoryIcon size={16} />
              </div>
              <div className="clock-item-library__item-content">
                <div className="clock-item-library__item-title">
                  {category.name}
                </div>
                <div className="clock-item-library__item-description">
                  {category.subcategories.length} subcategories
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );

  const renderCategoryDetailView = () => {
    if (!currentCategory) return null;

    return (
      <>
        <div className="clock-item-library__search">
          <div className="search-input">
            <SearchIcon className="search-input__icon" size={16} />
            <Input
              placeholder="Search subcategories..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm((e.target as HTMLInputElement).value)
              }
              className="search-input__field"
            />
          </div>
        </div>
        <div className="clock-item-library__items clock-item-library__items--scrollable">
          {currentCategory.subcategories
            .filter(
              (subcategory) =>
                !searchTerm ||
                subcategory.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()),
            )
            .map((subcategory) => {
              const subcategoryData = {
                subcategoryId: subcategory.id,
                name: subcategory.name,
                duration: subcategory.averageDuration?.raw || 0,
                color: subcategory.color,
              };
              const subcategoryStyle = {
                '--item-background-color': subcategory?.color
                  ? subcategory.color
                  : undefined,
              } as React.CSSProperties;
              return (
                <DraggableLibraryItem
                  key={subcategory.id}
                  id={`subcategory-${subcategory.id}`}
                  itemType="subcategory"
                  data={subcategoryData}
                  icon={CategoryIcon}
                  title={subcategory.name}
                  description={
                    subcategory.averageDuration?.formatted
                      ? `~${subcategory.averageDuration.formatted}`
                      : ''
                  }
                  className={
                    subcategory?.color
                      ? `clock-item-library__item--${getContrastColor(
                          subcategory.color,
                        )}`
                      : undefined
                  }
                  style={subcategoryStyle}
                />
              );
            })}
        </div>
      </>
    );
  };

  // Only show drop target styling when dragging a grid item (not library item)
  const isGridItemOver = isOver && active?.data.current?.type === 'grid-item';

  return (
    <div
      ref={setNodeRef}
      className={`clock-item-library ${
        isGridItemOver ? 'clock-item-library--drop-target' : ''
      }`}
    >
      <div className="clock-item-library__header">
        {currentView !== 'main' && currentView !== 'universal-search' && (
          <button
            className="clock-item-library__back"
            onClick={() => {
              if (currentView === 'category-detail') {
                setCurrentView('categories');
              } else {
                setCurrentView('main');
              }
            }}
          >
            ← Back
          </button>
        )}
        <h3>
          {currentView === 'main' && 'Library'}
          {currentView === 'universal-search' && 'Search Results'}
          {currentView === 'audio' && 'Audio'}
          {currentView === 'categories' && 'Categories'}
          {currentView === 'category-detail' && currentCategory?.name}
          {currentView === 'genres' && 'Genres'}
          {currentView === 'notes' && 'Notes'}
          {currentView === 'commands' && 'Commands'}
          {currentView === 'adbreaks' && 'Ad Breaks'}
        </h3>
        {['notes', 'commands', 'adbreaks'].includes(currentView) && (
          <button
            className="clock-item-library__add-btn"
            onClick={() => {
              const typeMap = {
                notes: MusicClockLibraryItemType.Note,
                commands: MusicClockLibraryItemType.Command,
                adbreaks: MusicClockLibraryItemType.AdBreak,
              };
              setNewItemType(typeMap[currentView as keyof typeof typeMap]);
              setIsCreateDialogOpen(true);
            }}
          >
            <AddIcon size={16} />
          </button>
        )}
      </div>

      {/* Universal Search Input - only show on main view */}
      {currentView === 'main' && (
        <div className="clock-item-library__search clock-item-library__search--universal">
          <div className="search-input">
            <SearchIcon className="search-input__icon" size={16} />
            <Input
              placeholder="Search all items..."
              value={universalSearchTerm}
              onChange={(e) => handleUniversalSearch((e.target as HTMLInputElement).value)}
              className="search-input__field"
            />
          </div>
        </div>
      )}

      {currentView === 'main' && !universalSearchTerm && renderMainView()}
      {currentView === 'universal-search' && renderUniversalSearchResults()}
      {currentView === 'audio' && renderAudioView()}
      {currentView === 'categories' && renderCategoriesView()}
      {currentView === 'category-detail' && renderCategoryDetailView()}
      {currentView === 'genres' && renderGenresView()}
      {currentView === 'notes' &&
        renderLibraryView('Notes', MusicClockLibraryItemType.Note)}
      {currentView === 'commands' &&
        renderLibraryView('Commands', MusicClockLibraryItemType.Command)}
      {currentView === 'adbreaks' &&
        renderLibraryView('Ad Breaks', MusicClockLibraryItemType.AdBreak)}

      {/* Create Library Item Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <Dialog.Overlay />
        <Dialog.Content className="max-w-md">
          <Dialog.Title>
            Create New{' '}
            {newItemType === MusicClockLibraryItemType.Note
              ? 'Note'
              : newItemType === MusicClockLibraryItemType.Command
              ? 'Command'
              : 'Ad Break'}
          </Dialog.Title>
          <div className="p-4 space-y-4">
            <Input
              label="Name"
              value={newItemName}
              onChange={(e) =>
                setNewItemName((e.target as HTMLInputElement).value)
              }
              placeholder="Enter item name"
            />

            {newItemType === MusicClockLibraryItemType.Note && (
              <Input
                label="Content"
                value={newItemContent}
                onChange={(e) =>
                  setNewItemContent((e.target as HTMLInputElement).value)
                }
                placeholder="Enter note content"
              />
            )}

            {newItemType === MusicClockLibraryItemType.Command && (
              <Input
                label="Command"
                value={newItemContent}
                onChange={(e) =>
                  setNewItemContent((e.target as HTMLInputElement).value)
                }
                placeholder="e.g. FADE_IN, FADE_OUT"
              />
            )}

            {newItemType === MusicClockLibraryItemType.AdBreak && (
              <Input
                type="number"
                label="Duration (seconds)"
                value={newItemContent}
                onChange={(e) =>
                  setNewItemContent((e.target as HTMLInputElement).value)
                }
                placeholder="180"
              />
            )}

            <div className="flex gap-2 pt-4">
              <Button
                variant="secondary"
                onClick={() => setIsCreateDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleCreateLibraryItem}
                disabled={!newItemName.trim()}
                className="flex-1"
              >
                Create
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
};

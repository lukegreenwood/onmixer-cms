'use client';

import { useLazyQuery, useMutation } from '@apollo/client';
import { Input, Button, Dialog } from '@soundwaves/components';
import { useState } from 'react';

import {
  MusicIcon,
  NoteIcon,
  CommandIcon,
  AdIcon,
  CategoryIcon,
  GenreIcon,
  SearchIcon,
  GripVerticalIcon,
  AddIcon,
  DeleteIcon,
  AudioIcon,
  ChevronRightIcon,
} from '@/components/icons';
import type {
  GetCategoriesQuery,
  GetGenresQuery,
  SearchTracksV2Query,
  GetMusicClockItemLibraryQuery,
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
import { useNetwork } from '@/hooks';
import { toast } from '@/lib/toast';

interface ClockItemLibraryProps {
  onAddItem: (itemType: string, data: Record<string, unknown>) => void;
}

type LibraryView =
  | 'main'
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

  const [createLibraryItem] = useMutation(CREATE_MUSIC_CLOCK_LIBRARY_ITEM);
  const [deleteLibraryItem] = useMutation(DELETE_MUSIC_CLOCK_LIBRARY_ITEM);

  const handleViewChange = (view: LibraryView) => {
    setCurrentView(view);
    setSearchTerm('');

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
          scheduledStartTime: '00:00',
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
            <div className="clock-item-library__item-drag">
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
              
              onAddItem(itemType, data);
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
            .map((item) => (
              <div
                key={item.id as string}
                className="clock-item-library__item clock-item-library__item--draggable"
                draggable
                onDragStart={(e) => {
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
                      scheduledStartTime: 'scheduledStartTime' in item ? item.scheduledStartTime : '00:00',
                    };
                  }
                  
                  handleDragStart(e, itemType, dragData);
                }}
              >
                <div className="clock-item-library__item-icon">
                  {type === MusicClockLibraryItemType.Note && (
                    <NoteIcon size={16} />
                  )}
                  {type === MusicClockLibraryItemType.Command && (
                    <CommandIcon size={16} />
                  )}
                  {type === MusicClockLibraryItemType.AdBreak && (
                    <AdIcon size={16} />
                  )}
                </div>
                <div className="clock-item-library__item-content">
                  <div className="clock-item-library__item-title">
                    {'label' in item ? item.label : item.id}
                  </div>
                  <div className="clock-item-library__item-description">
                    {type === MusicClockLibraryItemType.Command &&
                      'command' in item &&
                      item.command}
                    {type === MusicClockLibraryItemType.AdBreak &&
                      `${item.duration || 180}s`}
                  </div>
                </div>
                <div className="clock-item-library__item-actions">
                  <Button
                    variant="transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteLibraryItem(item.id);
                    }}
                    size="xs-icon"
                    isIconOnly
                    destructive
                  >
                    <DeleteIcon size={14} />
                  </Button>
                </div>
                <div className="clock-item-library__item-drag">
                  <GripVerticalIcon size={16} />
                </div>
              </div>
            ))}
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
        {tracks.map((track) => (
          <div
            key={track.id}
            className="clock-item-library__item clock-item-library__item--draggable"
            draggable
            onDragStart={handleAudioDrag(track)}
          >
            <div className="clock-item-library__item-icon">
              <AudioIcon size={16} />
            </div>
            <div className="clock-item-library__item-content">
              <div className="clock-item-library__item-title">
                {track.artist} - {track.title}
              </div>
              <div className="clock-item-library__item-description">
                {track.duration?.formatted || '0:00'}
              </div>
            </div>
            <div className="clock-item-library__item-drag">
              <GripVerticalIcon size={16} />
            </div>
          </div>
        ))}
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
        {genres.map((genre) => (
          <div
            key={genre.id}
            className="clock-item-library__item clock-item-library__item--draggable"
            draggable
            onDragStart={handleGenreDrag(genre)}
          >
            <div className="clock-item-library__item-icon">
              <GenreIcon size={16} />
            </div>
            <div className="clock-item-library__item-content">
              <div className="clock-item-library__item-title">{genre.name}</div>
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
        duration: subcategory.averageDuration?.raw || 0,
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
            .map((subcategory) => (
              <div
                key={subcategory.id}
                className="clock-item-library__item clock-item-library__item--draggable"
                draggable
                onDragStart={handleCategoryDrag(subcategory)}
                style={
                  {
                    '--item-background-color': subcategory.color,
                  } as React.CSSProperties
                }
              >
                <div className="clock-item-library__item-icon">
                  <CategoryIcon size={16} />
                </div>
                <div className="clock-item-library__item-content">
                  <div className="clock-item-library__item-title">
                    {subcategory.name}
                  </div>
                </div>
                <div className="clock-item-library__item-description">
                  {subcategory.averageDuration?.formatted
                    ? `~${subcategory.averageDuration.formatted}`
                    : ''}
                </div>
                <div className="clock-item-library__item-drag">
                  <GripVerticalIcon size={16} />
                </div>
              </div>
            ))}
        </div>
      </>
    );
  };

  return (
    <div className="clock-item-library">
      <div className="clock-item-library__header">
        {currentView !== 'main' && (
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

      {currentView === 'main' && renderMainView()}
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

'use client';

import { useQuery } from '@apollo/client';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Autocomplete, Loading } from '@soundwaves/components';
import { useMemo, useReducer } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';

import { Card } from '@/components/blocks/Card/Card';
import { DynamicForm } from '@/components/DynamicForm/DynamicForm';
import {
  DeleteIcon,
  DragIcon,
  ClockIcon,
  MusicIcon,
  NoteIcon,
  CategoryIcon,
  GenreIcon,
} from '@/components/icons';
import { GET_CATEGORIES } from '@/graphql/queries/categories';

import { QueryMusicClockItem } from './types';
import {
  formatDuration,
  isTrackClockItem,
  isSubcategoryClockItem,
  isGenreClockItem,
  isNoteClockItem,
  clockItemEditorReducer,
  initialClockItemEditorState,
} from './utils';

import type {
  TrackClockItem,
  SubcategoryClockItem,
  GenreClockItem,
  NoteClockItem,
} from '../types';

interface ClockItemEditorProps {
  items: QueryMusicClockItem[];
  onItemsChange: (items: QueryMusicClockItem[]) => void;
}

// Schema for individual clock item
const clockItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  duration: z.number().min(1, 'Duration must be at least 1 second'),
  orderIndex: z.number().min(0),
  // Track fields
  trackId: z.string().optional(),
  // Subcategory fields
  subcategoryId: z.string().optional(),
  // Genre fields
  genreId: z.string().optional(),
  // Note fields
  label: z.string().optional(),
  content: z.string().optional(),
});

type ClockItemFormData = z.infer<typeof clockItemSchema>;

// Draggable subcategory component for music slots
const DraggableSubcategory = ({
  subcategory,
}: {
  subcategory: {
    id: string;
    name: string;
    averageDuration?: { raw: number; formatted: string } | null;
  };
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `subcategory-${subcategory.id}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      className={`draggable-subcategory ${
        isDragging ? 'draggable-subcategory--dragging' : ''
      }`}
    >
      <div
        ref={setNodeRef}
        style={style}
        className="draggable-subcategory__content"
        {...attributes}
        {...listeners}
      >
        <div className="draggable-subcategory__icon">
          <MusicIcon size={16} />
        </div>
        <div className="draggable-subcategory__info">
          <div className="draggable-subcategory__label">{subcategory.name}</div>
          <div className="draggable-subcategory__duration">
            {subcategory.averageDuration?.formatted || '3:00'}
          </div>
        </div>
        <div className="draggable-subcategory__drag-handle">
          <DragIcon size={16} />
        </div>
      </div>
    </Card>
  );
};

// Draggable type block component for non-music items
const DraggableTypeBlock = ({
  type,
  icon: Icon,
  label,
  description,
  duration,
}: {
  type: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  description: string;
  duration: string;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `type-${type}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`draggable-type-block ${
        isDragging ? 'draggable-type-block--dragging' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="draggable-type-block__icon">
        <Icon size={16} />
      </div>
      <div className="draggable-type-block__content">
        <div className="draggable-type-block__label">{label}</div>
        <div className="draggable-type-block__description">{description}</div>
        <div className="draggable-type-block__duration">{duration}</div>
      </div>
      <div className="draggable-type-block__drag-handle">
        <DragIcon size={16} />
      </div>
    </div>
  );
};

// Sortable item component
const SortableClockItem = ({
  item,
  onEdit,
  onRemove,
}: {
  item: QueryMusicClockItem;
  onEdit: (item: QueryMusicClockItem) => void;
  onRemove: () => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getTypeIcon = (item: QueryMusicClockItem) => {
    if (isTrackClockItem(item)) {
      return MusicIcon;
    } else if (isSubcategoryClockItem(item)) {
      return MusicIcon;
    } else if (isGenreClockItem(item)) {
      return MusicIcon;
    } else if (isNoteClockItem(item)) {
      return NoteIcon;
    }
    return ClockIcon;
  };

  const getTypeLabel = (item: QueryMusicClockItem) => {
    if (isTrackClockItem(item)) {
      return 'Track';
    } else if (isSubcategoryClockItem(item)) {
      return 'Subcategory';
    } else if (isGenreClockItem(item)) {
      return 'Genre';
    } else if (isNoteClockItem(item)) {
      return 'Note';
    }
    return 'Unknown';
  };

  const TypeIcon = getTypeIcon(item);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`clock-item ${isDragging ? 'clock-item--dragging' : ''}`}
      {...attributes}
    >
      <div className="clock-item__header">
        <div className="clock-item__drag-handle" {...listeners}>
          <DragIcon size={16} />
        </div>
        <div className="clock-item__content">
          <div className="clock-item__type">
            <TypeIcon size={16} />
            <span className="clock-item__type-label">{getTypeLabel(item)}</span>
          </div>
          <div className="clock-item__name">
            <Input
              value={item.name || ''}
              onChange={(e) =>
                onEdit({
                  ...item,
                  name: (e.target as HTMLInputElement).value,
                })
              }
              placeholder="Item name"
            />
            <span className="clock-item__duration">
              ({formatDuration(item.duration || 0)})
            </span>
          </div>
        </div>
        <div className="clock-item__actions">
          <Button variant="secondary" size="sm" onClick={() => onEdit(item)}>
            Edit
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={onRemove}
            destructive
            isIconOnly
          >
            <DeleteIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Clock item form component
const ClockItemForm = ({
  item,
  onSave,
  onCancel,
}: {
  item: QueryMusicClockItem;
  onSave: (item: QueryMusicClockItem) => void;
  onCancel: () => void;
}) => {
  const defaultValues: ClockItemFormData = {
    name: item.name || '',
    duration: item.duration || 0,
    orderIndex: item.orderIndex || 0,
    trackId: isTrackClockItem(item) ? item.track.id : '',
    subcategoryId: isSubcategoryClockItem(item) ? item.subcategory.id : '',
    genreId: isGenreClockItem(item) ? item.genre.id : '',
    content: isNoteClockItem(item) ? item.content : '',
  };

  const methods = useForm<ClockItemFormData>({
    resolver: zodResolver(clockItemSchema),
    defaultValues,
  });

  const handleSubmit = (data: ClockItemFormData) => {
    // Create updated item based on current item type
    let updatedItem: QueryMusicClockItem;

    if (isTrackClockItem(item)) {
      updatedItem = {
        ...item,
        name: data.name,
        duration: data.duration,
        orderIndex: data.orderIndex,
        trackId: data.trackId || item.track.id,
      };
    } else if (isSubcategoryClockItem(item)) {
      updatedItem = {
        ...item,
        name: data.name,
        duration: data.duration,
        orderIndex: data.orderIndex,
        subcategoryId: data.subcategoryId || item.subcategory.id,
      };
    } else if (isGenreClockItem(item)) {
      updatedItem = {
        ...item,
        name: data.name,
        duration: data.duration,
        orderIndex: data.orderIndex,
        genreId: data.genreId || item.genre.id,
      };
    } else if (isNoteClockItem(item)) {
      updatedItem = {
        ...item,
        name: data.name,
        duration: data.duration,
        orderIndex: data.orderIndex,
        content: data.content || item.content,
        label: data.label || item.label,
      };
    } else {
      // Fallback
      updatedItem = item;
    }

    onSave(updatedItem);
  };

  const getTypeSpecificFields = () => {
    if (isTrackClockItem(item)) {
      return [
        {
          component: 'text' as const,
          name: 'trackId' as const,
          label: 'Track ID',
          placeholder: 'Track identifier',
        },
      ];
    } else if (isSubcategoryClockItem(item)) {
      return [
        {
          component: 'text' as const,
          name: 'subcategoryId' as const,
          label: 'Subcategory ID',
          placeholder: 'Subcategory identifier',
        },
      ];
    } else if (isGenreClockItem(item)) {
      return [
        {
          component: 'text' as const,
          name: 'genreId' as const,
          label: 'Genre ID',
          placeholder: 'Genre identifier',
        },
      ];
    } else if (isNoteClockItem(item)) {
      return [
        {
          component: 'textarea' as const,
          name: 'content' as const,
          label: 'Content',
          placeholder: 'Enter note content',
          rows: 3,
        },
        {
          component: 'text' as const,
          name: 'color' as const,
          label: 'Color',
          type: 'color',
        },
      ];
    }

    return [];
  };

  const baseFields = [
    {
      component: 'text' as const,
      name: 'name' as const,
      label: 'Name',
      placeholder: 'Item name',
    },
    {
      component: 'text' as const,
      name: 'duration' as const,
      label: 'Duration (seconds)',
      type: 'number',
      min: 1,
    },
    {
      component: 'text' as const,
      name: 'orderIndex' as const,
      label: 'Order',
      type: 'number',
      min: 0,
    },
  ];

  const typeSpecificFields = getTypeSpecificFields();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <div className="clock-item-form">
          <DynamicForm fields={baseFields} />
          {typeSpecificFields.length > 0 && (
            <DynamicForm fields={typeSpecificFields} />
          )}

          <div className="clock-item-form__actions">
            <Button variant="tertiary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export const ClockItemEditor = ({
  items,
  onItemsChange,
}: ClockItemEditorProps) => {
  const [state, dispatch] = useReducer(clockItemEditorReducer, initialClockItemEditorState);

  const { data: categoriesData, loading: categoriesLoading } =
    useQuery(GET_CATEGORIES);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    dispatch({ type: 'SET_ACTIVE_ID', payload: event.active.id.toString() });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    dispatch({ type: 'SET_ACTIVE_ID', payload: null });
    const { active, over } = event;

    if (!over) return;

    // Check if dragging a subcategory to the list
    if (active.id.toString().startsWith('subcategory-')) {
      const subcategoryId = active.id.toString().replace('subcategory-', '');
      const subcategory = categoriesData?.categories
        .flatMap((cat) => cat.subcategories)
        .find((sub) => sub.id === subcategoryId);

      if (subcategory) {
        const newItem: SubcategoryClockItem = {
          id: `item-${Date.now()}`,
          clockId: '',
          name: subcategory.name,
          duration: subcategory.averageDuration?.raw || 180,
          orderIndex: items.length,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          subcategoryId: subcategoryId,
          subcategory: {
            id: subcategoryId,
            name: subcategory.name,
          },
          averageDuration: subcategory.averageDuration?.raw || 180,
        };
        onItemsChange([...items, newItem]);
      }
      return;
    }

    // Check if dragging a type block to the list
    if (active.id.toString().startsWith('type-')) {
      const type = active.id.toString().replace('type-', '');
      const defaultDurations = {
        TRACK: 210, // 3:30
        SUBCATEGORY: 210,
        GENRE: 210,
        NOTE: 30,
      };

      let newItem: QueryMusicClockItem;
      const baseItem = {
        id: `item-${Date.now()}`,
        clockId: '',
        name: `New ${type.replace('_', ' ')}`,
        duration:
          defaultDurations[type as keyof typeof defaultDurations] || 180,
        orderIndex: items.length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      switch (type) {
        case 'TRACK':
          newItem = {
            ...baseItem,
            trackId: '',
            track: {
              id: '',
              title: '',
              artist: '',
              duration: {
                formatted: `${Math.floor(baseItem.duration / 60)}:${(
                  baseItem.duration % 60
                )
                  .toString()
                  .padStart(2, '0')}`,
              },
            },
          } as TrackClockItem;
          break;
        case 'SUBCATEGORY':
          newItem = {
            ...baseItem,
            subcategoryId: '',
            subcategory: {
              id: '',
              name: '',
            },
            averageDuration: baseItem.duration,
          } as SubcategoryClockItem;
          break;
        case 'GENRE':
          newItem = {
            ...baseItem,
            genreId: '',
            genre: {
              id: '',
              name: '',
            },
            averageDuration: baseItem.duration,
          } as GenreClockItem;
          break;
        case 'NOTE':
        default:
          newItem = {
            ...baseItem,
            content: '',
            color: '#3B82F6',
          } as NoteClockItem;
          break;
      }
      onItemsChange([...items, newItem]);
      return;
    }

    // Reorder existing items
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      onItemsChange(newItems);
    }
  };

  const handleEditItem = (item: QueryMusicClockItem) => {
    dispatch({ type: 'SET_EDITING_ITEM', payload: item });
  };

  const handleSaveItem = (updatedItem: QueryMusicClockItem) => {
    const newItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item,
    );
    onItemsChange(newItems);
    dispatch({ type: 'SET_EDITING_ITEM', payload: null });
  };

  const handleRemoveItem = (itemId: string) => {
    const newItems = items.filter((item) => item.id !== itemId);
    onItemsChange(newItems);
  };

  // Memoized data processing (must be before early returns)
  const categories = useMemo(
    () => categoriesData?.categories || [],
    [categoriesData?.categories],
  );
  const selectedCategoryData = categories.find(
    (cat) => cat.id === state.selectedCategory,
  );
  const subcategories = selectedCategoryData?.subcategories || [];

  // Create category options for Autocomplete
  const categoryOptions = useMemo(() => {
    return categories.map((category) => ({
      label: category.name,
      value: category.id,
    }));
  }, [categories]);

  console.log({ categoryOptions });

  const typeBlocks = [
    {
      type: 'TRACK',
      icon: MusicIcon,
      label: 'Track',
      description: 'Specific music track',
      duration: '3:30',
    },
    {
      type: 'SUBCATEGORY',
      icon: CategoryIcon,
      label: 'Subcategory',
      description: 'Music from subcategory',
      duration: '3:30',
    },
    {
      type: 'GENRE',
      icon: GenreIcon,
      label: 'Genre',
      description: 'Music from genre',
      duration: '3:30',
    },
    {
      type: 'NOTE',
      icon: NoteIcon,
      label: 'Note',
      description: 'Text note or announcement',
      duration: '0:30',
    },
  ];

  if (state.editingItem) {
    return (
      <ClockItemForm
        item={state.editingItem}
        onSave={handleSaveItem}
        onCancel={() => dispatch({ type: 'SET_EDITING_ITEM', payload: null })}
      />
    );
  }

  return (
    <div className="clock-item-editor">
      <div className="clock-item-editor__header">
        <h3 className="clock-item-editor__title">Clock Items</h3>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="clock-item-editor__content">
          {/* Category Selection for Music */}
          <div className="clock-item-editor__category-section">
            <h4 className="clock-item-editor__section-title">
              Music Categories:
            </h4>
            <div className="clock-item-editor__category-selector">
              <Autocomplete
                label="Select Music Category"
                placeholder="Choose a category to see subcategories..."
                value={state.selectedCategory || undefined}
                onChange={(value) => {
                  console.log(value);
                  dispatch({ type: 'SET_SELECTED_CATEGORY', payload: value });
                }}
                options={categoryOptions}
                after={categoriesLoading ? <Loading size="xs" /> : undefined}
                clearable
              />
            </div>

            {/* Subcategory Placeholders */}
            {state.selectedCategory && (
              <div className="clock-item-editor__subcategories">
                <h5 className="clock-item-editor__subsection-title">
                  Drag {selectedCategoryData?.name} subcategories:
                </h5>
                <div className="clock-item-editor__subcategories-grid">
                  {subcategories.map((subcategory) => (
                    <DraggableSubcategory
                      key={subcategory.id}
                      subcategory={subcategory}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Other Item Types */}
          <div className="clock-item-editor__type-blocks">
            <h4 className="clock-item-editor__section-title">Other Items:</h4>
            <div className="clock-item-editor__type-blocks-grid">
              {typeBlocks.map((block) => (
                <DraggableTypeBlock
                  key={block.type}
                  type={block.type}
                  icon={block.icon}
                  label={block.label}
                  description={block.description}
                  duration={block.duration}
                />
              ))}
            </div>
          </div>

          <div className="clock-item-editor__list">
            <h4 className="clock-item-editor__section-title">Clock Items:</h4>
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="clock-item-list">
                {items.length === 0 ? (
                  <div className="clock-item-editor__empty-state">
                    <div className="icon-text">
                      <ClockIcon className="icon" />
                      <span className="text-muted">
                        Drag items from above to build your clock
                      </span>
                    </div>
                  </div>
                ) : (
                  items.map((item) => (
                    <SortableClockItem
                      key={item.id}
                      item={item}
                      onEdit={handleEditItem}
                      onRemove={() => handleRemoveItem(item.id)}
                    />
                  ))
                )}
              </div>
            </SortableContext>
          </div>
        </div>

        <DragOverlay>
          {state.activeId
            ? state.activeId.startsWith('subcategory-')
              ? // Render preview for subcategories
                (() => {
                  const subcategoryId = state.activeId?.replace('subcategory-', '') || '';
                  const subcategory = categories
                    .flatMap((cat) => cat.subcategories)
                    .find((sub) => sub.id === subcategoryId);
                  if (subcategory) {
                    return (
                      <div className="draggable-subcategory draggable-subcategory--dragging">
                        <div className="draggable-subcategory__icon">
                          <MusicIcon size={16} />
                        </div>
                        <div className="draggable-subcategory__content">
                          <div className="draggable-subcategory__label">
                            {subcategory.name}
                          </div>
                          <div className="draggable-subcategory__duration">
                            {subcategory.averageDuration?.formatted || '3:00'}
                          </div>
                        </div>
                        <div className="draggable-subcategory__drag-handle">
                          <DragIcon size={16} />
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()
              : state.activeId.startsWith('type-')
              ? // Render preview for type blocks
                (() => {
                  const type = state.activeId?.replace('type-', '') || '';
                  const typeBlock = typeBlocks.find(
                    (block) => block.type === type,
                  );
                  if (typeBlock) {
                    const Icon = typeBlock.icon;
                    return (
                      <div className="draggable-type-block draggable-type-block--dragging">
                        <div className="draggable-type-block__icon">
                          <Icon size={16} />
                        </div>
                        <div className="draggable-type-block__content">
                          <div className="draggable-type-block__label">
                            {typeBlock.label}
                          </div>
                          <div className="draggable-type-block__description">
                            {typeBlock.description}
                          </div>
                          <div className="draggable-type-block__duration">
                            {typeBlock.duration}
                          </div>
                        </div>
                        <div className="draggable-type-block__drag-handle">
                          <DragIcon size={16} />
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()
              : // Render preview for existing items
                (() => {
                  const item = items.find((item) => item.id === state.activeId);
                  if (item) {
                    const getItemTypeIcon = (item: QueryMusicClockItem) => {
                      if (isTrackClockItem(item)) {
                        return MusicIcon;
                      } else if (isSubcategoryClockItem(item)) {
                        return MusicIcon;
                      } else if (isGenreClockItem(item)) {
                        return MusicIcon;
                      } else if (isNoteClockItem(item)) {
                        return NoteIcon;
                      }
                      return ClockIcon;
                    };
                    const getItemTypeLabel = (item: QueryMusicClockItem) => {
                      if (isTrackClockItem(item)) {
                        return 'Track';
                      } else if (isSubcategoryClockItem(item)) {
                        return 'Subcategory';
                      } else if (isGenreClockItem(item)) {
                        return 'Genre';
                      } else if (isNoteClockItem(item)) {
                        return 'Note';
                      }
                      return 'Unknown';
                    };
                    const TypeIcon = getItemTypeIcon(item);

                    return (
                      <div className="clock-item clock-item--dragging">
                        <div className="clock-item__header">
                          <div className="clock-item__drag-handle">
                            <DragIcon size={16} />
                          </div>
                          <div className="clock-item__content">
                            <div className="clock-item__type">
                              <TypeIcon size={16} />
                              <span className="clock-item__type-label">
                                {getItemTypeLabel(item)}
                              </span>
                            </div>
                            <div className="clock-item__name">
                              <span>{item.name || 'Unnamed Item'}</span>
                              <span className="clock-item__duration">
                                ({formatDuration(item.duration || 0)})
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()
            : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

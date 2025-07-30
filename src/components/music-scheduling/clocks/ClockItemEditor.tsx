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
import { useState, useMemo } from 'react';
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
  AdIcon,
  RadioIcon,
} from '@/components/icons';
import { GET_CATEGORIES } from '@/graphql/queries/categories';

import type { ClockItem } from '../types';

interface ClockItemEditorProps {
  items: ClockItem[];
  onItemsChange: (items: ClockItem[]) => void;
}

// Schema for individual clock item
const clockItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  duration: z.number().min(1, 'Duration must be at least 1 second'),
  orderIndex: z.number().min(0),
  type: z.string(),
  // Music Slot fields
  categories: z.array(z.string()).optional(),
  genre: z.string().optional(),
  priority: z.number().optional(),
  musicPriority: z.number().optional(),
  allowOverrun: z.boolean().optional(),
  // Note Block fields
  content: z.string().optional(),
  notePriority: z.string().optional(),
  color: z.string().optional(),
  // Ad Break fields
  adType: z.string().optional(),
  isFixed: z.boolean().optional(),
  // Station Ident fields
  identType: z.string().optional(),
  trackId: z.string().optional(),
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
  item: ClockItem;
  onEdit: (item: ClockItem) => void;
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

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'MUSIC_SLOT':
      case 'MusicSlot':
        return MusicIcon;
      case 'NOTE_BLOCK':
      case 'NoteBlock':
        return NoteIcon;
      case 'AD_BREAK':
      case 'AdBreak':
        return AdIcon;
      case 'STATION_IDENT':
      case 'StationIdent':
        return RadioIcon;
      default:
        return ClockIcon;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'MUSIC_SLOT':
      case 'MusicSlot':
        return 'Music Slot';
      case 'NOTE_BLOCK':
      case 'NoteBlock':
        return 'Note Block';
      case 'AD_BREAK':
      case 'AdBreak':
        return 'Ad Break';
      case 'STATION_IDENT':
      case 'StationIdent':
        return 'Station Ident';
      default:
        return 'Unknown';
    }
  };

  const TypeIcon = getTypeIcon(item.type || item.__typename || 'MUSIC_SLOT');

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
            <span className="clock-item__type-label">
              {getTypeLabel(item.type || item.__typename || 'MUSIC_SLOT')}
            </span>
            {item.isFromCategory && (
              <span className="clock-item__category-badge">Category</span>
            )}
          </div>
          <div className="clock-item__name">
            {item.isFromCategory ? (
              <span className="clock-item__name-readonly">
                {item.name || 'Unnamed Item'}
              </span>
            ) : (
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
            )}
            <span className="clock-item__duration">
              ({formatDuration(item.duration || 0)})
            </span>
          </div>
        </div>
        <div className="clock-item__actions">
          {!item.isFromCategory && (
            <Button variant="secondary" size="sm" onClick={() => onEdit(item)}>
              Edit
            </Button>
          )}
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
  item: ClockItem;
  onSave: (item: ClockItem) => void;
  onCancel: () => void;
}) => {
  const defaultValues: ClockItemFormData = {
    name: item.name || '',
    duration: item.duration || 0,
    orderIndex: item.orderIndex || 0,
    type: item.type || item.__typename || 'MUSIC_SLOT',
    categories: item.categories || [],
    genre: item.genre || '',
    priority: item.priority || item.musicPriority || 5,
    allowOverrun: item.allowOverrun || false,
    content: item.content || '',
    notePriority: item.notePriority || 'MEDIUM',
    color: item.color || '#3B82F6',
    adType: item.adType || 'LOCAL_COMMERCIAL',
    isFixed: item.isFixed || false,
    identType: item.identType || 'STATION_ID',
    trackId: item.trackId || '',
  };

  const methods = useForm<ClockItemFormData>({
    resolver: zodResolver(clockItemSchema),
    defaultValues,
  });

  const handleSubmit = (data: ClockItemFormData) => {
    const updatedItem: ClockItem = {
      ...item,
      ...data,
    };
    onSave(updatedItem);
  };

  const getTypeSpecificFields = () => {
    const type = methods.watch('type');

    switch (type) {
      case 'MUSIC_SLOT':
        return [
          {
            component: 'categorySelector' as const,
            name: 'categories' as const,
            label: 'Categories',
            placeholder: 'Select categories',
          },
          {
            component: 'genreSelector' as const,
            name: 'genre' as const,
            label: 'Genre',
            placeholder: 'Select genre',
          },
          {
            component: 'text' as const,
            name: 'priority' as const,
            label: 'Priority',
            type: 'number',
            min: 1,
            max: 10,
          },
          {
            component: 'checkbox' as const,
            name: 'allowOverrun' as const,
            label: 'Allow Overrun',
          },
        ];

      case 'NOTE_BLOCK':
        return [
          {
            component: 'textarea' as const,
            name: 'content' as const,
            label: 'Content',
            placeholder: 'Enter note content',
            rows: 3,
          },
          {
            component: 'radioGroup' as const,
            name: 'notePriority' as const,
            label: 'Priority',
            options: [
              { label: 'Low', value: 'LOW' },
              { label: 'Medium', value: 'MEDIUM' },
              { label: 'High', value: 'HIGH' },
            ],
          },
          {
            component: 'text' as const,
            name: 'color' as const,
            label: 'Color',
            type: 'color',
          },
        ];

      case 'AD_BREAK':
        return [
          {
            component: 'radioGroup' as const,
            name: 'adType' as const,
            label: 'Ad Type',
            options: [
              { label: 'Local Commercial', value: 'LOCAL_COMMERCIAL' },
              { label: 'National Commercial', value: 'NATIONAL_COMMERCIAL' },
              { label: 'Promo', value: 'PROMO' },
              { label: 'PSA', value: 'PSA' },
            ],
          },
          {
            component: 'checkbox' as const,
            name: 'isFixed' as const,
            label: 'Fixed Duration',
          },
        ];

      case 'STATION_IDENT':
        return [
          {
            component: 'radioGroup' as const,
            name: 'identType' as const,
            label: 'Ident Type',
            options: [
              { label: 'Station ID', value: 'STATION_ID' },
              { label: 'Jingle', value: 'JINGLE' },
              { label: 'Sweeper', value: 'SWEEPER' },
              { label: 'Liner', value: 'LINER' },
            ],
          },
          {
            component: 'text' as const,
            name: 'trackId' as const,
            label: 'Track ID',
            placeholder: 'Optional specific track',
          },
        ];

      default:
        return [];
    }
  };

  const baseFields = [
    {
      component: 'radioGroup' as const,
      name: 'type' as const,
      label: 'Type',
      options: [
        { label: 'Music Slot', value: 'MUSIC_SLOT' },
        { label: 'Note Block', value: 'NOTE_BLOCK' },
        { label: 'Ad Break', value: 'AD_BREAK' },
        { label: 'Station Ident', value: 'STATION_IDENT' },
      ],
    },
    {
      component: 'text' as const,
      name: 'duration' as const,
      label: 'Duration',
      placeholder: 'mm:ss',
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
  const [editingItem, setEditingItem] = useState<ClockItem | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: categoriesData, loading: categoriesLoading } =
    useQuery(GET_CATEGORIES);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (!over) return;

    // Check if dragging a subcategory to the list
    if (active.id.toString().startsWith('subcategory-')) {
      const subcategoryId = active.id.toString().replace('subcategory-', '');
      const subcategory = categoriesData?.categories
        .flatMap((cat) => cat.subcategories)
        .find((sub) => sub.id === subcategoryId);

      if (subcategory) {
        const newItem: ClockItem = {
          id: `item-${Date.now()}`,
          name: subcategory.name,
          duration: subcategory.averageDuration?.raw || 180,
          orderIndex: items.length,
          type: 'MUSIC_SLOT',
          categories: [subcategoryId], // Keep as array for backend compatibility but use single value
          category: subcategoryId, // Add single category field
          genres: [],
          priority: 5,
          allowOverrun: false,
          isFromCategory: true, // Flag to indicate this came from category drag
        };
        onItemsChange([...items, newItem]);
      }
      return;
    }

    // Check if dragging a type block to the list
    if (active.id.toString().startsWith('type-')) {
      const type = active.id.toString().replace('type-', '');
      const defaultDurations = {
        MUSIC_SLOT: 210, // 3:30
        NOTE_BLOCK: 30,
        AD_BREAK: 120,
        STATION_IDENT: 15,
      };

      const newItem: ClockItem = {
        id: `item-${Date.now()}`,
        name: `New ${type.replace('_', ' ')}`,
        duration:
          defaultDurations[type as keyof typeof defaultDurations] || 180,
        orderIndex: items.length,
        type,
        // Type-specific defaults
        ...(type === 'MUSIC_SLOT' && {
          categories: [],
          genre: '',
          priority: 5,
          allowOverrun: false,
          isFromCategory: false, // This is editable unlike category-based ones
        }),
        ...(type === 'NOTE_BLOCK' && {
          content: '',
          notePriority: 'MEDIUM',
          color: '#3B82F6',
        }),
        ...(type === 'AD_BREAK' && {
          adType: 'LOCAL_COMMERCIAL',
          isFixed: true,
        }),
        ...(type === 'STATION_IDENT' && {
          identType: 'STATION_ID',
          trackId: '',
        }),
      };
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

  const handleEditItem = (item: ClockItem) => {
    setEditingItem(item);
  };

  const handleSaveItem = (updatedItem: ClockItem) => {
    const newItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item,
    );
    onItemsChange(newItems);
    setEditingItem(null);
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
    (cat) => cat.id === selectedCategory,
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
      type: 'MUSIC_SLOT',
      icon: MusicIcon,
      label: 'Music Item',
      description: 'Configurable music slot',
      duration: '3:30',
    },
    {
      type: 'NOTE_BLOCK',
      icon: NoteIcon,
      label: 'Note Block',
      description: 'Add notes and announcements',
      duration: '0:30',
    },
    {
      type: 'AD_BREAK',
      icon: AdIcon,
      label: 'Ad Break',
      description: 'Commercial breaks and promos',
      duration: '2:00',
    },
    {
      type: 'STATION_IDENT',
      icon: RadioIcon,
      label: 'Station Ident',
      description: 'Station identification and jingles',
      duration: '0:15',
    },
  ];

  if (editingItem) {
    return (
      <ClockItemForm
        item={editingItem}
        onSave={handleSaveItem}
        onCancel={() => setEditingItem(null)}
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
                value={selectedCategory || undefined}
                onChange={(value) => {
                  console.log(value);
                  setSelectedCategory(value);
                }}
                options={categoryOptions}
                after={categoriesLoading ? <Loading size="xs" /> : undefined}
                clearable
              />
            </div>

            {/* Subcategory Placeholders */}
            {selectedCategory && (
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
          {activeId
            ? activeId.startsWith('subcategory-')
              ? // Render preview for subcategories
                (() => {
                  const subcategoryId = activeId.replace('subcategory-', '');
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
              : activeId.startsWith('type-')
              ? // Render preview for type blocks
                (() => {
                  const type = activeId.replace('type-', '');
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
                  const item = items.find((item) => item.id === activeId);
                  if (item) {
                    const getTypeIcon = (type: string) => {
                      switch (type) {
                        case 'MUSIC_SLOT':
                        case 'MusicSlot':
                          return MusicIcon;
                        case 'NOTE_BLOCK':
                        case 'NoteBlock':
                          return NoteIcon;
                        case 'AD_BREAK':
                        case 'AdBreak':
                          return AdIcon;
                        case 'STATION_IDENT':
                        case 'StationIdent':
                          return RadioIcon;
                        default:
                          return ClockIcon;
                      }
                    };

                    const TypeIcon = getTypeIcon(
                      item.type || item.__typename || 'MUSIC_SLOT',
                    );
                    const formatDuration = (seconds: number) => {
                      const minutes = Math.floor(seconds / 60);
                      const secs = seconds % 60;
                      return `${minutes}:${secs.toString().padStart(2, '0')}`;
                    };

                    return (
                      <div className="clock-item clock-item--dragging">
                        <div className="clock-item__header">
                          <div className="clock-item__drag-handle">
                            <DragIcon size={16} />
                          </div>
                          <div className="clock-item__content">
                            <div className="clock-item__type">
                              <TypeIcon size={16} />
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

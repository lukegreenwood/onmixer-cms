'use client';

import { useDroppable } from '@dnd-kit/core';
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge, Button, DropdownMenu } from '@soundwaves/components';
import React from 'react';

import {
  AudioIcon,
  AdIcon,
  CategoryIcon,
  MoreHorizontalIcon,
  NoteIcon,
  CommandIcon,
  GenreIcon,
  EditIcon,
  DeleteIcon,
  GripVerticalIcon,
} from '@/components/icons';
import type { GetMusicClockQuery } from '@/graphql/__generated__/graphql';

import { formatDuration } from '../utils';

type ClockItem = NonNullable<GetMusicClockQuery['musicClock']>['items'][number];

// Ghost item component to show preview of dragged item
function GhostClockItem({
  draggedItem,
}: {
  draggedItem: {
    type?: string;
    itemType?: string;
    data?: Record<string, unknown>;
    item?: any;
  };
}) {
  let Icon = AudioIcon;
  let typeLabel = 'Unknown';
  let title = 'Item';
  let description = '';

  // Handle grid item reordering
  if (draggedItem.type === 'grid-item' && draggedItem.item) {
    const gridItem = draggedItem.item;

    switch (gridItem.__typename) {
      case 'TrackClockItem':
        Icon = AudioIcon;
        typeLabel = 'Track';
        title = gridItem.track?.title || 'Track';
        description = formatDuration(
          Math.floor(Math.abs(gridItem.duration || 0)),
        );
        break;
      case 'NoteClockItem':
        Icon = NoteIcon;
        typeLabel = 'Note';
        title = gridItem.content || 'Note';
        break;
      case 'CommandClockItem':
        Icon = CommandIcon;
        typeLabel = 'Command';
        title = gridItem.command || 'Command';
        break;
      case 'AdBreakClockItem':
        Icon = AdIcon;
        typeLabel = 'Commercial';
        title = gridItem.scheduledStartTime || '00:00';
        description = formatDuration(
          Math.floor(Math.abs(gridItem.duration || 180)),
        );
        break;
      case 'SubcategoryClockItem':
        Icon = CategoryIcon;
        typeLabel = gridItem.subcategory?.name || 'Category';
        title = 'Unscheduled position';
        break;
      case 'GenreClockItem':
        Icon = GenreIcon;
        typeLabel = gridItem.genre?.name || 'Genre';
        title = 'Unscheduled position';
        break;
      case 'LibraryNoteClockItem':
        Icon = NoteIcon;
        typeLabel = 'Library Note';
        title = (gridItem as any).note?.content || 'Library Note';
        break;
      case 'LibraryCommandClockItem':
        Icon = CommandIcon;
        typeLabel = 'Library Command';
        title = (gridItem as any).libraryCommand?.command || 'Library Command';
        break;
      case 'LibraryAdBreakClockItem':
        Icon = AdIcon;
        typeLabel = 'Library Ad Break';
        title = (gridItem as any).adBreak?.scheduledStartTime || '00:00';
        description = formatDuration(
          Math.floor(Math.abs(gridItem.duration || 180)),
        );
        break;
    }
  } else {
    // Handle library items
    const { itemType, data } = draggedItem;
    title = (data?.name as string) || 'Item';

    if (itemType === 'track') {
      Icon = AudioIcon;
      typeLabel = 'Track';
      description = `${formatDuration((data?.duration as number) || 0)}`;
    } else if (itemType === 'genre') {
      Icon = GenreIcon;
      typeLabel = (data?.name as string) || 'Genre';
    } else if (itemType === 'subcategory') {
      Icon = CategoryIcon;
      typeLabel = (data?.name as string) || 'Category';
    } else if (itemType === 'note' || itemType === 'library_note') {
      Icon = NoteIcon;
      typeLabel = 'Note';
    } else if (itemType === 'command' || itemType === 'library_command') {
      Icon = CommandIcon;
      typeLabel = 'Command';
    } else if (itemType === 'ad_break' || itemType === 'library_ad_break') {
      Icon = AdIcon;
      typeLabel = 'Commercial';
      description = `${(data?.duration as number) || 180}s`;
    }
  }

  return (
    <div className="clock-grid__row clock-grid__row--ghost">
      <div className="clock-grid__cell clock-grid__cell--drag-handle">
        <div className="clock-grid__drag-handle">
          <GripVerticalIcon size={16} />
        </div>
      </div>

      <div className="clock-grid__cell clock-grid__cell--air-time">
        <span>--:--</span>
      </div>

      <div className="clock-grid__cell clock-grid__cell--type">
        <Badge color="gray" size="sm" before={<Icon size={16} />}>
          {typeLabel}
        </Badge>
      </div>

      <div className="clock-grid__cell clock-grid__cell--title">{title}</div>

      <div className="clock-grid__cell clock-grid__cell--artist">
        {/* Empty for now */}
      </div>

      <div className="clock-grid__cell clock-grid__cell--duration">
        {description || formatDuration(180)}
      </div>

      <div className="clock-grid__cell clock-grid__cell--item-id">------</div>

      <div className="clock-grid__cell clock-grid__cell--actions">
        {/* Empty for ghost */}
      </div>
    </div>
  );
}

interface ClockGridProps {
  items: ClockItem[];
  onItemEdit: (item: ClockItem) => void;
  onItemDelete: (itemId: string) => void;
  onItemReorder?: (fromIndex: number, toIndex: number) => void;
  onItemAdd?: (
    itemType: string,
    data: Record<string, unknown>,
    position?: number,
  ) => void;
  insertionIndex?: number | null;
  draggedItem?: {
    type?: string;
    itemType?: string;
    data?: Record<string, unknown>;
    item?: any;
  } | null;
}

interface SortableItemProps {
  item: ClockItem;
  index: number;
  items: ClockItem[];
  onItemEdit: (item: ClockItem) => void;
  onItemDelete: (itemId: string) => void;
}

function SortableClockItem({
  item,
  index,
  items,
  onItemEdit,
  onItemDelete,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      type: 'grid-item',
      item,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getItemIcon = (item: ClockItem) => {
    switch (item.__typename) {
      case 'TrackClockItem':
        return AudioIcon;
      case 'SubcategoryClockItem':
        return CategoryIcon;
      case 'GenreClockItem':
        return GenreIcon;
      case 'NoteClockItem':
      case 'LibraryNoteClockItem':
        return NoteIcon;
      case 'CommandClockItem':
      case 'LibraryCommandClockItem':
        return CommandIcon;
      case 'AdBreakClockItem':
      case 'LibraryAdBreakClockItem':
        return AdIcon;
      default:
        return AudioIcon;
    }
  };

  const getItemTypeLabel = (item: ClockItem) => {
    switch (item.__typename) {
      case 'TrackClockItem':
        return 'Track';
      case 'SubcategoryClockItem':
        return item.subcategory?.name || 'Category';
      case 'GenreClockItem':
        return item.genre?.name || 'Genre';
      case 'NoteClockItem':
        return 'Note';
      case 'CommandClockItem':
        return 'Command';
      case 'AdBreakClockItem':
        return 'Commercial';
      case 'LibraryNoteClockItem':
        return 'Library Note';
      case 'LibraryCommandClockItem':
        return 'Library Command';
      case 'LibraryAdBreakClockItem':
        return 'Library Ad Break';
      default:
        return 'Unknown';
    }
  };

  const getItemSourceId = (item: ClockItem) => {
    switch (item.__typename) {
      case 'TrackClockItem':
        return item.track?.id || item.id;
      case 'SubcategoryClockItem':
        return item.subcategory?.id || item.id;
      case 'GenreClockItem':
        return item.genre?.id || item.id;
      case 'LibraryNoteClockItem':
        return (item as { note?: { id: string } }).note?.id || item.id;
      case 'LibraryCommandClockItem':
        return (
          (item as { libraryCommand?: { id: string } }).libraryCommand?.id ||
          item.id
        );
      case 'LibraryAdBreakClockItem':
        return (item as { adBreak?: { id: string } }).adBreak?.id || item.id;
      case 'NoteClockItem':
      case 'CommandClockItem':
      case 'AdBreakClockItem':
        return item.id;
      default:
        return item.id;
    }
  };

  const getItemTitle = (item: ClockItem) => {
    switch (item.__typename) {
      case 'TrackClockItem':
        return item.track?.title || 'Unknown Track';
      case 'SubcategoryClockItem':
        return 'Unscheduled position';
      case 'GenreClockItem':
        return 'Unscheduled position';
      case 'NoteClockItem':
        return item.content || 'Note';
      case 'CommandClockItem':
        return item.command || 'Command';
      case 'AdBreakClockItem':
        return item.scheduledStartTime || '00:00';
      case 'LibraryNoteClockItem':
        return (
          (item as { note?: { content?: string; label?: string } }).note
            ?.content ||
          (item as { note?: { content?: string; label?: string } }).note
            ?.label ||
          'Library Note'
        );
      case 'LibraryCommandClockItem':
        return (
          (item as { libraryCommand?: { command?: string } }).libraryCommand
            ?.command || 'Library Command'
        );
      case 'LibraryAdBreakClockItem':
        return (
          (item as { adBreak?: { scheduledStartTime?: string } }).adBreak
            ?.scheduledStartTime || '00:00'
        );
      default:
        return 'Unknown';
    }
  };

  const getItemArtist = (_item: ClockItem) => {
    return '';
  };

  const getItemBadgeColor = (item: ClockItem) => {
    switch (item.__typename) {
      case 'SubcategoryClockItem':
        return 'green';
      case 'GenreClockItem':
        return 'blue';
      case 'NoteClockItem':
      case 'LibraryNoteClockItem':
        return 'gray';
      case 'CommandClockItem':
      case 'LibraryCommandClockItem':
        return 'purple';
      case 'AdBreakClockItem':
      case 'LibraryAdBreakClockItem':
        return 'red';
      default:
        return 'blue';
    }
  };

  const calculateAirTime = (index: number, items: ClockItem[]) => {
    let totalSeconds = 0;
    for (let i = 0; i < index; i++) {
      totalSeconds += Math.floor(Math.abs(items[i].duration));
    }
    return formatDuration(totalSeconds);
  };

  const Icon = getItemIcon(item);
  const airTime = calculateAirTime(index, items);
  const badgeColor = getItemBadgeColor(item);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`clock-grid__row ${isDragging ? 'is-dragging' : ''}`}
    >
      <div className="clock-grid__cell clock-grid__cell--drag-handle">
        <div className="clock-grid__drag-handle" {...attributes} {...listeners}>
          <GripVerticalIcon size={16} />
        </div>
      </div>

      <div className="clock-grid__cell clock-grid__cell--air-time">
        <span>{airTime}</span>
      </div>

      <div className="clock-grid__cell clock-grid__cell--type">
        <Badge
          color={badgeColor}
          size="sm"
          before={<Icon size={16} />}
          style={
            {
              '--badge-color':
                item.__typename === 'SubcategoryClockItem'
                  ? `var(--subcategory-color, var(--green-500))`
                  : undefined,
            } as React.CSSProperties
          }
        >
          {getItemTypeLabel(item)}
        </Badge>
      </div>

      <div className="clock-grid__cell clock-grid__cell--title">
        {getItemTitle(item)}
      </div>

      <div className="clock-grid__cell clock-grid__cell--artist">
        {getItemArtist(item)}
      </div>

      <div className="clock-grid__cell clock-grid__cell--duration">
        {formatDuration(Math.floor(Math.abs(item.duration)))}
      </div>

      <div className="clock-grid__cell clock-grid__cell--item-id">
        {getItemSourceId(item).slice(-6)}
      </div>

      <div className="clock-grid__cell clock-grid__cell--actions">
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Button variant="transparent" size="sm" isIconOnly>
              <MoreHorizontalIcon size={16} />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Item onClick={() => onItemEdit(item)}>
              <EditIcon size={16} />
              Edit
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => onItemDelete(item.id)}
              className="text-red-600"
            >
              <DeleteIcon size={16} />
              Remove
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    </div>
  );
}

export const ClockGrid = ({
  items,
  onItemEdit,
  onItemDelete,
  insertionIndex,
  draggedItem,
}: ClockGridProps) => {
  const { setNodeRef } = useDroppable({
    id: 'clock-grid',
  });

  return (
    <div ref={setNodeRef} className="clock-grid">
      <div className="clock-grid__header">
        <div className="clock-grid__column"></div>
        <div className="clock-grid__column">Air Time</div>
        <div className="clock-grid__column">Type / Category</div>
        <div className="clock-grid__column">Title</div>
        <div className="clock-grid__column">Artist</div>
        <div className="clock-grid__column">Duration</div>
        <div className="clock-grid__column">Item ID</div>
        <div className="clock-grid__column">Actions</div>
      </div>

      <div className="clock-grid__body">
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item, index) => {
            const showGhostBefore = insertionIndex === index;
            return (
              <React.Fragment key={item.id}>
                {showGhostBefore && draggedItem && (
                  <GhostClockItem draggedItem={draggedItem} />
                )}
                <SortableClockItem
                  item={item}
                  index={index}
                  items={items}
                  onItemEdit={onItemEdit}
                  onItemDelete={onItemDelete}
                />
              </React.Fragment>
            );
          })}
          {insertionIndex === items.length && draggedItem && (
            <GhostClockItem draggedItem={draggedItem} />
          )}
        </SortableContext>
      </div>
    </div>
  );
};

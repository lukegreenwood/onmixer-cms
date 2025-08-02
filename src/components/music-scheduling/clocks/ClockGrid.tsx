'use client';

import { Badge, Button, DropdownMenu } from '@soundwaves/components';
import { useState } from 'react';

import {
  AudioIcon,
  AdIcon,
  CategoryIcon,
  GripVerticalIcon,
  MoreHorizontalIcon,
  NoteIcon,
  CommandIcon,
  GenreIcon,
  EditIcon,
  DeleteIcon,
} from '@/components/icons';
import type { GetMusicClockQuery } from '@/graphql/__generated__/graphql';

import { formatDuration } from '../utils';

type ClockItem = NonNullable<GetMusicClockQuery['musicClock']>['items'][number];

interface ClockGridProps {
  items: ClockItem[];
  onItemEdit: (item: ClockItem) => void;
  onItemDelete: (itemId: string) => void;
  onItemReorder: (fromIndex: number, toIndex: number) => void;
  onItemAdd: (itemType: string, data: Record<string, unknown>) => void;
}

export const ClockGrid = ({
  items,
  onItemEdit,
  onItemDelete,
  onItemReorder,
  onItemAdd,
}: ClockGridProps) => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const getItemIcon = (item: ClockItem) => {
    switch (item.__typename) {
      case 'TrackClockItem':
        return AudioIcon;
      case 'SubcategoryClockItem':
        return CategoryIcon;
      case 'GenreClockItem':
        return GenreIcon;
      case 'NoteClockItem':
        return NoteIcon;
      case 'CommandClockItem':
        return CommandIcon;
      case 'AdBreakClockItem':
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
      default:
        return 'Unknown';
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
      default:
        return 'Unknown';
    }
  };

  const getItemArtist = (item: ClockItem) => {
    if (item.__typename === 'TrackClockItem' && item.track?.artist) {
      return item.track.artist;
    }
    return '';
  };

  const getItemBadgeColor = (item: ClockItem) => {
    switch (item.__typename) {
      case 'SubcategoryClockItem':
        return 'green';
      case 'GenreClockItem':
        return 'blue';
      case 'NoteClockItem':
        return 'gray';
      case 'CommandClockItem':
        return 'purple';
      case 'AdBreakClockItem':
        return 'red';
      default:
        return 'blue';
    }
  };

  const calculateAirTime = (index: number) => {
    let totalSeconds = 0;
    for (let i = 0; i < index; i++) {
      totalSeconds += items[i].duration;
    }
    return formatDuration(totalSeconds);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    // Handle reordering existing items
    if (draggedItem !== null && draggedItem !== dropIndex) {
      onItemReorder(draggedItem, dropIndex);
      setDraggedItem(null);
      return;
    }

    // Handle dropping from library
    try {
      const dragData = e.dataTransfer.getData('application/json');
      if (dragData) {
        const { itemType, data } = JSON.parse(dragData);
        onItemAdd(itemType, data);
      }
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }

    setDraggedItem(null);
  };

  const handleGridDrop = (e: React.DragEvent) => {
    e.preventDefault();

    // Handle dropping from library to end of list
    try {
      const dragData = e.dataTransfer.getData('application/json');
      if (dragData) {
        const { itemType, data } = JSON.parse(dragData);
        onItemAdd(itemType, data);
      }
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }
  };

  return (
    <div
      className="clock-grid"
      onDragOver={handleDragOver}
      onDrop={handleGridDrop}
    >
      <div className="clock-grid__header">
        <div className="clock-grid__column">Air Time</div>
        <div className="clock-grid__column">Type / Category</div>
        <div className="clock-grid__column">Title</div>
        <div className="clock-grid__column">Artist</div>
        <div className="clock-grid__column">Duration</div>
        <div className="clock-grid__column">Item ID</div>
        <div className="clock-grid__column">Actions</div>
      </div>

      <div className="clock-grid__body">
        {items.map((item, index) => {
          const Icon = getItemIcon(item);
          const airTime = calculateAirTime(index);
          const badgeColor = getItemBadgeColor(item);

          return (
            <div
              key={item.id}
              className={`clock-grid__row ${
                draggedItem === index ? 'clock-grid__row--dragging' : ''
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="clock-grid__cell clock-grid__cell--air-time">
                <GripVerticalIcon
                  className="clock-grid__drag-handle"
                  size={16}
                />
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
                          ? `var(--subcategory-${item.subcategory?.id}-color, var(--green-500))`
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
                {item.duration > 0
                  ? formatDuration(item.duration)
                  : '-' + formatDuration(Math.abs(item.duration))}
              </div>

              <div className="clock-grid__cell clock-grid__cell--item-id">
                {item.id.slice(-6)}
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
        })}
      </div>
    </div>
  );
};

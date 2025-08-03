'use client';

import { useSortable, useDroppable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge, Button, DropdownMenu } from '@soundwaves/components';
import React from 'react';
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
  onItemReorder?: (fromIndex: number, toIndex: number) => void;
  onItemAdd: (itemType: string, data: Record<string, unknown>, position?: number) => void;
}

interface SortableItemProps {
  item: ClockItem;
  index: number;
  items: ClockItem[];
  onItemEdit: (item: ClockItem) => void;
  onItemDelete: (itemId: string) => void;
}

interface DroppableZoneProps {
  index: number;
  children: React.ReactNode;
  onDrop: (e: React.DragEvent, index: number) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  showPlaceholder: boolean;
  placeholderContent?: string;
}

function DroppableZone({ index, children, onDrop, onDragOver, showPlaceholder, placeholderContent }: DroppableZoneProps) {
  return (
    <React.Fragment>
      {showPlaceholder && (
        <div className="clock-grid__placeholder">
          <div className="clock-grid__placeholder-content">
            {placeholderContent || 'Drop here'}
          </div>
        </div>
      )}
      <div
        onDragOver={(e) => onDragOver(e, index)}
        onDrop={(e) => onDrop(e, index)}
        className="clock-grid__droppable-zone"
      >
        {children}
      </div>
    </React.Fragment>
  );
}

function SortableItem({ item, index, items, onItemEdit, onItemDelete }: SortableItemProps) {
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
        return (item as { libraryCommand?: { id: string } }).libraryCommand?.id || item.id;
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
        return (item as { note?: { content?: string; label?: string } }).note?.content || (item as { note?: { content?: string; label?: string } }).note?.label || 'Library Note';
      case 'LibraryCommandClockItem':
        return (item as { libraryCommand?: { command?: string } }).libraryCommand?.command || 'Library Command';
      case 'LibraryAdBreakClockItem':
        return (item as { adBreak?: { scheduledStartTime?: string } }).adBreak?.scheduledStartTime || '00:00';
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
      className={`clock-grid__row ${isDragging ? 'clock-grid__row--dragging' : ''}`}
      {...attributes}
    >
      <div className="clock-grid__cell clock-grid__cell--air-time">
        <GripVerticalIcon
          className="clock-grid__drag-handle"
          size={16}
          {...listeners}
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
  onItemAdd,
}: ClockGridProps) => {
  const [isDraggingFromLibrary, setIsDraggingFromLibrary] = useState(false);
  const [libraryDragData, setLibraryDragData] = useState<{itemType: string, data: Record<string, unknown>} | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);


  const handleDragOver = (e: React.DragEvent, index?: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (index !== undefined) {
      setDragOverIndex(index);
    }
    
    // Check if dragging from library
    const dragData = e.dataTransfer.getData('application/json');
    if (dragData && !isDraggingFromLibrary) {
      try {
        const parsed = JSON.parse(dragData);
        setIsDraggingFromLibrary(true);
        setLibraryDragData(parsed);
      } catch {
        // Ignore parse errors
      }
    }
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    // Handle dropping from library
    try {
      const dragData = e.dataTransfer.getData('application/json');
      if (dragData) {
        const { itemType, data } = JSON.parse(dragData);
        onItemAdd(itemType, data, dropIndex);
      }
    } catch (error) {
      console.error('Error parsing drag data:', error);
    }

    setDragOverIndex(null);
    setIsDraggingFromLibrary(false);
    setLibraryDragData(null);
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
    
    setDragOverIndex(null);
    setIsDraggingFromLibrary(false);
    setLibraryDragData(null);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only reset if leaving the grid entirely
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDragOverIndex(null);
      setIsDraggingFromLibrary(false);
      setLibraryDragData(null);
    }
  };

  return (
    <div
      className="clock-grid"
      onDragOver={(e) => handleDragOver(e)}
      onDrop={handleGridDrop}
      onDragLeave={handleDragLeave}
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
          const shouldShowPlaceholder = isDraggingFromLibrary && dragOverIndex === index;
          const placeholderContent = libraryDragData ? `Dropping: ${libraryDragData.data.name as string || 'New Item'}` : undefined;
          
          return (
            <DroppableZone
              key={`${item.id}-zone`}
              index={index}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              showPlaceholder={shouldShowPlaceholder}
              placeholderContent={placeholderContent}
            >
              <SortableItem
                key={item.id}
                item={item}
                index={index}
                items={items}
                onItemEdit={onItemEdit}
                onItemDelete={onItemDelete}
              />
            </DroppableZone>
          );
        })}
        
        {/* Show placeholder at end if dragging from library */}
        <DroppableZone
          index={items.length}
          onDrop={handleGridDrop}
          onDragOver={handleDragOver}
          showPlaceholder={isDraggingFromLibrary && dragOverIndex === items.length}
          placeholderContent={libraryDragData ? `Dropping: ${libraryDragData.data.name as string || 'New Item'}` : undefined}
        >
          <div className="clock-grid__end-zone" />
        </DroppableZone>
      </div>
    </div>
  );
};

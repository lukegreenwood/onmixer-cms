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
  MoreHorizontalIcon,
  EditIcon,
  DeleteIcon,
  GripVerticalIcon,
} from '@/components/icons';

import { formatDuration } from '../utils';

import { QueryMusicClockItem, DragData } from './types';
import { 
  isGridItemDrag, 
  isLibraryItemDrag, 
  getDisplayInfo, 
  getLibraryDisplayInfo, 
  calculateAirTime 
} from './utils';

type ClockItem = QueryMusicClockItem;

// Ghost item component to show preview of dragged item
function GhostClockItem({ draggedItem }: { draggedItem: DragData }) {
  let Icon = AudioIcon;
  let typeLabel = 'Unknown';
  let title = 'Item';
  let description = '';

  // Handle grid item reordering
  if (isGridItemDrag(draggedItem)) {
    const displayInfo = getDisplayInfo(draggedItem.item);
    Icon = displayInfo.icon;
    typeLabel = displayInfo.typeLabel;
    title = displayInfo.title;
    description = displayInfo.description || formatDuration(180);
  } else if (isLibraryItemDrag(draggedItem)) {
    // Handle library items
    const displayInfo = getLibraryDisplayInfo(draggedItem.itemType, draggedItem.data);
    Icon = displayInfo.icon;
    typeLabel = displayInfo.typeLabel;
    title = displayInfo.title;
    description = displayInfo.description;
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
    itemType: import('./types').LibraryItemType,
    data: import('./types').LibraryItemData,
    position?: number,
  ) => void;
  insertionIndex?: number | null;
  draggedItem?: DragData | null;
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

  // Get display information using the centralized helper
  const displayInfo = getDisplayInfo(item);
  const airTime = calculateAirTime(index, items);
  const Icon = displayInfo.icon;

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
          color={displayInfo.badgeColor}
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
          {displayInfo.typeLabel}
        </Badge>
      </div>

      <div className="clock-grid__cell clock-grid__cell--title">
        {displayInfo.title}
      </div>

      <div className="clock-grid__cell clock-grid__cell--artist">
        {/* Empty for now */}
      </div>

      <div className="clock-grid__cell clock-grid__cell--duration">
        {formatDuration(Math.floor(Math.abs(item.duration)))}
      </div>

      <div className="clock-grid__cell clock-grid__cell--item-id">
        {displayInfo.sourceId.slice(-6)}
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

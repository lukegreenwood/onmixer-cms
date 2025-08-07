'use client';

import { useMutation } from '@apollo/client';
import { useDroppable } from '@dnd-kit/core';
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Badge, Button, DropdownMenu } from '@soundwaves/components';
import clsx from 'clsx';
import React, { useState, useCallback } from 'react';

import {
  AudioIcon,
  MoreHorizontalIcon,
  EditIcon,
  DeleteIcon,
  GripVerticalIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  CopyIcon,
  NoteIcon,
  AdIcon,
} from '@/components/icons';
import { UPDATE_MUSIC_CLOCK_LIBRARY_ITEM } from '@/graphql/mutations/musicClockLibraryItem';
import { toast } from '@/lib/toast';

import { formatDuration } from '../utils';

import { AddCommandModal } from './AddCommandModal';
import { AddCommercialModal } from './AddCommercialModal';
import { AddNoteModal } from './AddNoteModal';
import { QueryMusicClockItem, DragData } from './types';
import {
  isGridItemDrag,
  isLibraryItemDrag,
  getDisplayInfo,
  getLibraryDisplayInfo,
  calculateAirTime,
  getContrastColor,
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
    const displayInfo = getLibraryDisplayInfo(
      draggedItem.itemType,
      draggedItem.data,
    );
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
      <div className="clock-grid__card">
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
    </div>
  );
}

interface ClockGridProps {
  items: ClockItem[];
  onItemEdit: (item: ClockItem) => void;
  onItemDelete: (itemId: string) => void;
  onItemsUpdate: (items: ClockItem[]) => void;
  insertionIndex?: number | null;
  draggedItem?: DragData | null;
}

interface SortableItemProps {
  item: ClockItem;
  index: number;
  items: ClockItem[];
  onItemEdit: (item: ClockItem) => void;
  onItemDelete: (itemId: string) => void;
  onItemMoveUp: (itemId: string) => void;
  onItemMoveDown: (itemId: string) => void;
  onItemDuplicate: (itemId: string) => void;
  onOpenNoteDialog: (itemId: string, isEdit: boolean) => void;
  onOpenCommercialDialog: (itemId: string, isEdit: boolean) => void;
  onOpenCommandDialog: (itemId: string, isEdit: boolean) => void;
}

function SortableClockItem({
  item,
  index,
  items,
  onItemEdit,
  onItemDelete,
  onItemMoveUp,
  onItemMoveDown,
  onItemDuplicate,
  onOpenNoteDialog,
  onOpenCommercialDialog,
  onOpenCommandDialog,
}: SortableItemProps) {
  const canMoveUp = index > 0;
  const canMoveDown = index < items.length - 1;

  // Determine if this item type should show an edit action
  const canEdit =
    item.__typename === 'NoteClockItem' ||
    item.__typename === 'AdBreakClockItem' ||
    item.__typename === 'LibraryNoteClockItem' ||
    item.__typename === 'LibraryAdBreakClockItem' ||
    item.__typename === 'LibraryCommandClockItem' ||
    item.__typename === 'CommandClockItem';

  const handleEditClick = useCallback(() => {
    if (item.__typename === 'NoteClockItem') {
      onOpenNoteDialog(item.id, true);
    } else if (item.__typename === 'AdBreakClockItem') {
      onOpenCommercialDialog(item.id, true);
    } else if (item.__typename === 'LibraryNoteClockItem') {
      onOpenNoteDialog(item.id, true);
    } else if (item.__typename === 'LibraryAdBreakClockItem') {
      onOpenCommercialDialog(item.id, true);
    } else if (
      item.__typename === 'LibraryCommandClockItem' ||
      item.__typename === 'CommandClockItem'
    ) {
      onOpenCommandDialog(item.id, true);
    } else {
      onItemEdit(item);
    }
  }, [
    item,
    onItemEdit,
    onOpenNoteDialog,
    onOpenCommercialDialog,
    onOpenCommandDialog,
  ]);
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
    opacity: isDragging ? 0.8 : 1,
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
      <div
        className={clsx('clock-grid__card', {
          'clock-grid__card--unscheduled': displayInfo.isUnscheduled,
        })}
      >
        <div className="clock-grid__cell clock-grid__cell--type">
          <Badge
            color={displayInfo.badgeColor}
            size="md"
            before={<Icon size={16} />}
            className={
              item.__typename === 'SubcategoryClockItem' &&
              item.subcategory?.color
                ? `badge--${getContrastColor(item.subcategory.color)}`
                : undefined
            }
            style={
              {
                '--badge-color':
                  item.__typename === 'SubcategoryClockItem' &&
                  item.subcategory?.color
                    ? item.subcategory.color
                    : undefined,
              } as React.CSSProperties
            }
          >
            {displayInfo.typeLabel}
          </Badge>
        </div>

        <div className="clock-grid__cell clock-grid__cell--title">
          <div className="clock-grid__cell-text">{displayInfo.title}</div>
        </div>

        <div className="clock-grid__cell clock-grid__cell--artist">
          {item.__typename === 'TrackClockItem' ? item.track.artist : ''}
        </div>

        <div className="clock-grid__cell clock-grid__cell--duration">
          {item.__typename === 'SubcategoryClockItem' ||
          item.__typename === 'GenreClockItem'
            ? '~'
            : ''}
          {formatDuration(Math.floor(Math.abs(item.duration)))}
        </div>

        <div className="clock-grid__cell clock-grid__cell--item-id">
          {item.__typename === 'TrackClockItem' ? (
            <Badge color="gray" size="sm" stroke>
              {displayInfo.sourceId}
            </Badge>
          ) : null}
        </div>

        <div className="clock-grid__cell clock-grid__cell--actions">
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button variant="transparent" size="sm" isIconOnly>
                <MoreHorizontalIcon />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              {canEdit && (
                <DropdownMenu.Item
                  onClick={() => setTimeout(() => handleEditClick(), 0)}
                >
                  <EditIcon size={16} />
                  Edit
                </DropdownMenu.Item>
              )}
              <DropdownMenu.Item
                onClick={() => onItemMoveUp(item.id)}
                disabled={!canMoveUp}
              >
                <ChevronUpIcon size={16} />
                Move up
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => onItemMoveDown(item.id)}
                disabled={!canMoveDown}
              >
                <ChevronDownIcon size={16} />
                Move down
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => onItemDuplicate(item.id)}>
                <CopyIcon size={16} />
                Duplicate
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item
                onClick={() =>
                  setTimeout(() => onOpenNoteDialog(item.id, false), 0)
                }
              >
                <NoteIcon size={16} />
                Add note below
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() =>
                  setTimeout(() => onOpenCommercialDialog(item.id, false), 0)
                }
              >
                <AdIcon size={16} />
                Add commercial below
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item
                onClick={() => onItemDelete(item.id)}
                destructive
              >
                <DeleteIcon size={16} />
                Remove
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export const ClockGrid = ({
  items,
  onItemEdit,
  onItemDelete,
  onItemsUpdate,
  insertionIndex,
  draggedItem,
}: ClockGridProps) => {
  // GraphQL mutations
  const [updateLibraryItem] = useMutation(UPDATE_MUSIC_CLOCK_LIBRARY_ITEM, {
    refetchQueries: ['GetMusicClock'],
  });

  // Global modal state for all items
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [commercialDialogOpen, setCommercialDialogOpen] = useState(false);
  const [commandDialogOpen, setCommandDialogOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const editingItem = editingItemId
    ? items.find((item) => item.id === editingItemId)
    : null;

  // Helper function to check if an item is a library item
  const isLibraryItem = useCallback((item: ClockItem) => {
    return item.__typename === 'LibraryNoteClockItem' ||
           item.__typename === 'LibraryAdBreakClockItem' ||
           item.__typename === 'LibraryCommandClockItem';
  }, []);

  const handleItemMoveUp = useCallback(
    (itemId: string) => {
      const itemIndex = items.findIndex((item) => item.id === itemId);
      if (itemIndex > 0) {
        const newItems = [...items];
        [newItems[itemIndex - 1], newItems[itemIndex]] = [
          newItems[itemIndex],
          newItems[itemIndex - 1],
        ];
        // Update order indices
        const reorderedItems = newItems.map((item, index) => ({
          ...item,
          orderIndex: index,
        }));
        onItemsUpdate(reorderedItems);
      }
    },
    [items, onItemsUpdate],
  );

  const handleItemMoveDown = useCallback(
    (itemId: string) => {
      const itemIndex = items.findIndex((item) => item.id === itemId);
      if (itemIndex < items.length - 1) {
        const newItems = [...items];
        [newItems[itemIndex], newItems[itemIndex + 1]] = [
          newItems[itemIndex + 1],
          newItems[itemIndex],
        ];
        // Update order indices
        const reorderedItems = newItems.map((item, index) => ({
          ...item,
          orderIndex: index,
        }));
        onItemsUpdate(reorderedItems);
      }
    },
    [items, onItemsUpdate],
  );

  const handleItemDuplicate = useCallback(
    (itemId: string) => {
      const itemToDuplicate = items.find((item) => item.id === itemId);
      if (itemToDuplicate) {
        const itemIndex = items.findIndex((item) => item.id === itemId);
        const duplicatedItem = {
          ...itemToDuplicate,
          id: `temp-${Date.now()}`,
          orderIndex: itemIndex + 1,
        };
        const newItems = [...items];
        newItems.splice(itemIndex + 1, 0, duplicatedItem);
        // Update order indices for items after insertion
        const reorderedItems = newItems.map((item, index) => ({
          ...item,
          orderIndex: index,
        }));
        onItemsUpdate(reorderedItems);
      }
    },
    [items, onItemsUpdate],
  );

  const handleAddNoteBelow = useCallback(
    (itemId: string, label: string, content: string) => {
      const itemIndex = items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        const noteItem: QueryMusicClockItem = {
          __typename: 'NoteClockItem',
          id: `temp-${Date.now()}`,
          clockId: items[0]?.clockId || '',
          orderIndex: itemIndex + 1,
          duration: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          label,
          content,
        };
        const newItems = [...items];
        newItems.splice(itemIndex + 1, 0, noteItem);
        // Update order indices for items after insertion
        const reorderedItems = newItems.map((item, index) => ({
          ...item,
          orderIndex: index,
        }));
        onItemsUpdate(reorderedItems);
      }
    },
    [items, onItemsUpdate],
  );

  const handleAddCommercialBelow = useCallback(
    (itemId: string, duration: number, scheduledStartTime?: string) => {
      const itemIndex = items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        const commercialItem: QueryMusicClockItem = {
          __typename: 'AdBreakClockItem',
          id: `temp-${Date.now()}`,
          clockId: items[0]?.clockId || '',
          orderIndex: itemIndex + 1,
          duration,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          scheduledStartTime: scheduledStartTime || null,
        };
        const newItems = [...items];
        newItems.splice(itemIndex + 1, 0, commercialItem);
        // Update order indices for items after insertion
        const reorderedItems = newItems.map((item, index) => ({
          ...item,
          orderIndex: index,
        }));
        onItemsUpdate(reorderedItems);
      }
    },
    [items, onItemsUpdate],
  );

  // Centralized modal handlers
  const handleOpenNoteDialog = useCallback(
    (itemId: string, isEdit: boolean) => {
      // Prevent double-opening
      if (noteDialogOpen || commercialDialogOpen || commandDialogOpen) return;

      setEditingItemId(itemId);
      setIsEditMode(isEdit);
      setNoteDialogOpen(true);
    },
    [noteDialogOpen, commercialDialogOpen, commandDialogOpen],
  );

  const handleOpenCommercialDialog = useCallback(
    (itemId: string, isEdit: boolean) => {
      // Prevent double-opening
      if (noteDialogOpen || commercialDialogOpen || commandDialogOpen) return;

      setEditingItemId(itemId);
      setIsEditMode(isEdit);
      setCommercialDialogOpen(true);
    },
    [noteDialogOpen, commercialDialogOpen, commandDialogOpen],
  );

  const handleOpenCommandDialog = useCallback(
    (itemId: string, isEdit: boolean) => {
      // Prevent double-opening
      if (noteDialogOpen || commercialDialogOpen || commandDialogOpen) return;

      setEditingItemId(itemId);
      setIsEditMode(isEdit);
      setCommandDialogOpen(true);
    },
    [noteDialogOpen, commercialDialogOpen, commandDialogOpen],
  );

  const handleNoteDialogClose = useCallback((open: boolean) => {
    setNoteDialogOpen(open);
    if (!open) {
      // Ensure all modal state is cleared
      setEditingItemId(null);
      setIsEditMode(false);
      setCommercialDialogOpen(false); // Ensure other modals are also closed
      setCommandDialogOpen(false);
    }
  }, []);

  const handleCommercialDialogClose = useCallback((open: boolean) => {
    setCommercialDialogOpen(open);
    if (!open) {
      // Ensure all modal state is cleared
      setEditingItemId(null);
      setIsEditMode(false);
      setNoteDialogOpen(false); // Ensure other modals are also closed
      setCommandDialogOpen(false);
    }
  }, []);

  const handleCommandDialogClose = useCallback((open: boolean) => {
    setCommandDialogOpen(open);
    if (!open) {
      // Ensure all modal state is cleared
      setEditingItemId(null);
      setIsEditMode(false);
      setNoteDialogOpen(false); // Ensure other modals are also closed
      setCommercialDialogOpen(false);
    }
  }, []);

  const handleNoteSubmit = useCallback(
    async (label: string, content: string) => {
      if (editingItemId) {
        if (isEditMode && editingItem) {
          // Check if it's a library item
          if (isLibraryItem(editingItem)) {
            try {
              // Update library item using GraphQL mutation
              let libraryItemId: string;
              if (editingItem.__typename === 'LibraryNoteClockItem') {
                libraryItemId = editingItem.note?.id || '';
              } else {
                // This shouldn't happen for notes, but handle gracefully
                return;
              }

              await updateLibraryItem({
                variables: {
                  input: {
                    id: libraryItemId,
                    label,
                    content,
                  },
                },
              });

              toast('Library note updated successfully', 'success');
            } catch (error) {
              console.error('Error updating library note:', error);
              toast('Failed to update library note', 'error');
            }
          } else {
            // Regular item - use existing logic
            const updatedItem = { ...editingItem!, label, content };
            onItemEdit(updatedItem as QueryMusicClockItem);
          }
        } else {
          // Add new item below
          handleAddNoteBelow(editingItemId, label, content);
        }
      }
      // Close modal after successful submit
      handleNoteDialogClose(false);
    },
    [
      editingItemId,
      isEditMode,
      editingItem,
      isLibraryItem,
      updateLibraryItem,
      onItemEdit,
      handleAddNoteBelow,
      handleNoteDialogClose,
    ],
  );

  const handleCommercialSubmit = useCallback(
    async (duration: number, scheduledStartTime?: string) => {
      if (editingItemId) {
        if (isEditMode && editingItem) {
          // Check if it's a library item
          if (isLibraryItem(editingItem)) {
            try {
              // Update library item using GraphQL mutation
              let libraryItemId: string;
              if (editingItem.__typename === 'LibraryAdBreakClockItem') {
                libraryItemId = editingItem.adBreak?.id || '';
              } else {
                // This shouldn't happen for commercials, but handle gracefully
                return;
              }

              await updateLibraryItem({
                variables: {
                  input: {
                    id: libraryItemId,
                    duration,
                    scheduledStartTime: scheduledStartTime || null,
                  },
                },
              });

              toast('Library commercial updated successfully', 'success');
            } catch (error) {
              console.error('Error updating library commercial:', error);
              toast('Failed to update library commercial', 'error');
            }
          } else {
            // Regular item - use existing logic
            const updatedItem = {
              ...editingItem!,
              duration,
              scheduledStartTime: scheduledStartTime || null,
            };
            onItemEdit(updatedItem as QueryMusicClockItem);
          }
        } else {
          // Add new item below
          handleAddCommercialBelow(editingItemId, duration, scheduledStartTime);
        }
      }
      // Close modal after successful submit
      handleCommercialDialogClose(false);
    },
    [
      editingItemId,
      isEditMode,
      editingItem,
      isLibraryItem,
      updateLibraryItem,
      onItemEdit,
      handleAddCommercialBelow,
      handleCommercialDialogClose,
    ],
  );

  const handleCommandSubmit = useCallback(
    async (command: string) => {
      if (editingItemId) {
        if (isEditMode && editingItem) {
          // Check if it's a library item
          if (isLibraryItem(editingItem)) {
            try {
              // Update library item using GraphQL mutation
              let libraryItemId: string;
              if (editingItem.__typename === 'LibraryCommandClockItem') {
                libraryItemId = editingItem.libraryCommand?.id || '';
              } else {
                // This shouldn't happen for commands, but handle gracefully
                return;
              }

              await updateLibraryItem({
                variables: {
                  input: {
                    id: libraryItemId,
                    command,
                  },
                },
              });

              toast('Library command updated successfully', 'success');
            } catch (error) {
              console.error('Error updating library command:', error);
              toast('Failed to update library command', 'error');
            }
          } else {
            // Regular item - use existing logic
            const updatedItem = { ...editingItem!, command };
            onItemEdit(updatedItem as QueryMusicClockItem);
          }
        }
        // Commands don't have "add below" functionality in this context
      }
      // Close modal after successful submit
      handleCommandDialogClose(false);
    },
    [
      editingItemId,
      isEditMode,
      editingItem,
      isLibraryItem,
      updateLibraryItem,
      onItemEdit,
      handleCommandDialogClose,
    ],
  );

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
        <div className="clock-grid__column clock-grid__column--actions"></div>
      </div>

      <div className="clock-grid__body">
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item, index) => {
            const showGhostBefore = insertionIndex === index;
            const shouldShowGhost =
              showGhostBefore && draggedItem && isLibraryItemDrag(draggedItem);
            return (
              <React.Fragment key={item.id}>
                {shouldShowGhost && (
                  <GhostClockItem draggedItem={draggedItem} />
                )}
                <SortableClockItem
                  item={item}
                  index={index}
                  items={items}
                  onItemEdit={onItemEdit}
                  onItemDelete={onItemDelete}
                  onItemMoveUp={handleItemMoveUp}
                  onItemMoveDown={handleItemMoveDown}
                  onItemDuplicate={handleItemDuplicate}
                  onOpenNoteDialog={handleOpenNoteDialog}
                  onOpenCommercialDialog={handleOpenCommercialDialog}
                  onOpenCommandDialog={handleOpenCommandDialog}
                />
              </React.Fragment>
            );
          })}
          {insertionIndex === items.length &&
            draggedItem &&
            isLibraryItemDrag(draggedItem) && (
              <GhostClockItem draggedItem={draggedItem} />
            )}
        </SortableContext>
      </div>

      {/* Global modals for all items */}
      <AddNoteModal
        key={`note-${editingItemId}-${isEditMode}`}
        open={noteDialogOpen}
        onOpenChange={handleNoteDialogClose}
        onSubmit={handleNoteSubmit}
        initialLabel={
          isEditMode
            ? editingItem?.__typename === 'NoteClockItem'
              ? editingItem.label || undefined
              : editingItem?.__typename === 'LibraryNoteClockItem'
              ? editingItem.note?.label || undefined
              : undefined
            : undefined
        }
        initialContent={
          isEditMode
            ? editingItem?.__typename === 'NoteClockItem'
              ? editingItem.content || undefined
              : editingItem?.__typename === 'LibraryNoteClockItem'
              ? editingItem.note?.content || undefined
              : undefined
            : undefined
        }
      />

      <AddCommercialModal
        key={`commercial-${editingItemId}-${isEditMode}`}
        open={commercialDialogOpen}
        onOpenChange={handleCommercialDialogClose}
        onSubmit={handleCommercialSubmit}
        initialDuration={
          isEditMode
            ? editingItem?.__typename === 'AdBreakClockItem'
              ? editingItem.duration
              : editingItem?.__typename === 'LibraryAdBreakClockItem'
              ? editingItem.adBreak?.duration
              : undefined
            : undefined
        }
        initialScheduledStartTime={
          isEditMode
            ? editingItem?.__typename === 'AdBreakClockItem'
              ? editingItem.scheduledStartTime || undefined
              : editingItem?.__typename === 'LibraryAdBreakClockItem'
              ? editingItem.adBreak?.scheduledStartTime || undefined
              : undefined
            : undefined
        }
      />

      <AddCommandModal
        key={`command-${editingItemId}-${isEditMode}`}
        open={commandDialogOpen}
        onOpenChange={handleCommandDialogClose}
        onSubmit={handleCommandSubmit}
        initialCommand={
          isEditMode
            ? editingItem?.__typename === 'CommandClockItem'
              ? editingItem.command
              : editingItem?.__typename === 'LibraryCommandClockItem'
              ? editingItem.libraryCommand?.command
              : undefined
            : undefined
        }
      />
    </div>
  );
};

import { formatDuration } from './formatting';
import { formatTimeForDisplay } from './timeFormatting';
import {
  isTrackClockItem,
  isSubcategoryClockItem,
  isGenreClockItem,
  isNoteClockItem,
  isCommandClockItem,
  isAdBreakClockItem,
  isLibraryNoteClockItem,
  isLibraryCommandClockItem,
  isLibraryAdBreakClockItem,
} from './typeGuards';

import type {
  QueryMusicClockItem,
  LibraryItemType,
  LibraryItemData,
  BadgeColor,
} from '../types';

/**
 * Get the display title for a clock item
 */
export const getTitle = (item: QueryMusicClockItem): string => {
  if (isTrackClockItem(item)) {
    return item.track?.title || 'Unknown Track';
  }
  if (isSubcategoryClockItem(item) || isGenreClockItem(item)) {
    return 'Unscheduled position';
  }
  if (isNoteClockItem(item)) {
    return item.content || 'Note';
  }
  if (isCommandClockItem(item)) {
    return item.command || 'Command';
  }
  if (isAdBreakClockItem(item)) {
    return formatTimeForDisplay(item.scheduledStartTime) || '00:00';
  }
  if (isLibraryNoteClockItem(item)) {
    return item.note?.content || item.note?.label || 'Library Note';
  }
  if (isLibraryCommandClockItem(item)) {
    return item.libraryCommand?.command || 'Library Command';
  }
  if (isLibraryAdBreakClockItem(item)) {
    return formatTimeForDisplay(item.adBreak?.scheduledStartTime) || '00:00';
  }
  return 'Unknown';
};

/**
 * Get the type label for a clock item
 */
export const getTypeLabel = (item: QueryMusicClockItem): string => {
  if (isTrackClockItem(item)) return 'Track';
  if (isSubcategoryClockItem(item)) return item.subcategory?.name || 'Category';
  if (isGenreClockItem(item)) return item.genre?.name || 'Genre';
  if (isNoteClockItem(item)) return 'Log Note';
  if (isCommandClockItem(item)) return 'Log Command';
  if (isAdBreakClockItem(item)) return 'Log Commerical';
  if (isLibraryNoteClockItem(item)) return 'Note';
  if (isLibraryCommandClockItem(item)) return 'Command';
  if (isLibraryAdBreakClockItem(item)) return 'Commerical';
  return 'Unknown';
};

/**
 * Get the badge color for a clock item
 */
export const getBadgeColor = (item: QueryMusicClockItem): BadgeColor => {
  if (isTrackClockItem(item)) return 'gray';
  if (isSubcategoryClockItem(item)) return 'green';
  if (isGenreClockItem(item)) return 'orange';
  if (isNoteClockItem(item) || isLibraryNoteClockItem(item)) return 'gray';
  if (isCommandClockItem(item) || isLibraryCommandClockItem(item))
    return 'purple';
  if (isAdBreakClockItem(item) || isLibraryAdBreakClockItem(item)) return 'red';
  return 'gray'; // Default fallback
};

/**
 * Get the source ID for a clock item (for display purposes)
 */
export const getSourceId = (item: QueryMusicClockItem): string => {
  if (isTrackClockItem(item)) return item.track?.id || item.id;
  if (isSubcategoryClockItem(item)) return item.subcategory?.id || item.id;
  if (isGenreClockItem(item)) return item.genre?.id || item.id;
  if (isLibraryNoteClockItem(item)) return item.note?.id || item.id;
  if (isLibraryCommandClockItem(item))
    return item.libraryCommand?.id || item.id;
  if (isLibraryAdBreakClockItem(item)) return item.adBreak?.id || item.id;
  return ''; // Fallback to clock item ID
};

/**
 * Get the description for a clock item (used in drag overlay and other places)
 */
export const getDescription = (item: QueryMusicClockItem): string => {
  if (
    isTrackClockItem(item) ||
    isAdBreakClockItem(item) ||
    isLibraryAdBreakClockItem(item)
  ) {
    return formatDuration(Math.floor(Math.abs(item.duration || 0)));
  }
  if (isSubcategoryClockItem(item)) return 'Category';
  if (isGenreClockItem(item)) return 'Genre';
  if (isNoteClockItem(item) || isLibraryNoteClockItem(item)) return 'Note';
  if (isCommandClockItem(item) || isLibraryCommandClockItem(item))
    return 'Command';
  return '';
};

/**
 * Get the type label for a library item
 */
export const getLibraryTypeLabel = (
  itemType: LibraryItemType,
  data: LibraryItemData,
): string => {
  switch (itemType) {
    case 'track':
      return 'Track';
    case 'genre':
      return data.name || 'Genre';
    case 'subcategory':
      return data.name || 'Category';
    case 'note':
    case 'library_note':
      return 'Note';
    case 'command':
    case 'library_command':
      return 'Command';
    case 'ad_break':
    case 'library_ad_break':
      return 'Commercial';
    default:
      return 'Unknown';
  }
};

/**
 * Get the description for a library item
 */
export const getLibraryDescription = (
  itemType: LibraryItemType,
  data: LibraryItemData,
): string => {
  switch (itemType) {
    case 'track':
      return formatDuration((data.duration as number) || 0);
    case 'genre':
      return 'Genre';
    case 'subcategory':
      return 'Category';
    case 'note':
    case 'library_note':
      return 'Note';
    case 'command':
    case 'library_command':
      return 'Command';
    case 'ad_break':
    case 'library_ad_break':
      return `${(data.duration as number) || 180}s`;
    default:
      return '';
  }
};

/**
 * Get the editable name for a clock item (for form inputs)
 */
export const getEditableName = (item: QueryMusicClockItem): string => {
  if (isNoteClockItem(item)) {
    return item.label || '';
  }
  // For other types, names are not editable (they come from referenced data)
  return '';
};

/**
 * Update a clock item with an editable name (only for items that support it)
 */
export const updateItemWithEditableName = (
  item: QueryMusicClockItem,
  name: string,
): QueryMusicClockItem => {
  if (isNoteClockItem(item)) {
    return { ...item, label: name };
  }
  // For other types, return the item unchanged since names aren't editable
  return item;
};

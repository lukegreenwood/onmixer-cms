import React from 'react';

import {
  AudioIcon,
  AdIcon,
  CategoryIcon,
  NoteIcon,
  CommandIcon,
  GenreIcon,
} from '@/components/icons';
import type { IconProps } from '@/components/icons/types';

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

import type { QueryMusicClockItem, LibraryItemType } from '../types';

/**
 * Get the appropriate icon component for a clock item
 */
export const getIcon = (item: QueryMusicClockItem): ({ size, className }: IconProps) => React.JSX.Element => {
  if (isTrackClockItem(item)) return AudioIcon;
  if (isSubcategoryClockItem(item)) return CategoryIcon;
  if (isGenreClockItem(item)) return GenreIcon;
  if (isNoteClockItem(item) || isLibraryNoteClockItem(item)) return NoteIcon;
  if (isCommandClockItem(item) || isLibraryCommandClockItem(item)) return CommandIcon;
  if (isAdBreakClockItem(item) || isLibraryAdBreakClockItem(item)) return AdIcon;
  return AudioIcon; // Default fallback
};

/**
 * Get the appropriate icon for a library item type
 */
export const getLibraryIcon = (itemType: LibraryItemType): ({ size, className }: IconProps) => React.JSX.Element => {
  switch (itemType) {
    case 'track':
      return AudioIcon;
    case 'genre':
      return GenreIcon;
    case 'subcategory':
      return CategoryIcon;
    case 'note':
    case 'library_note':
      return NoteIcon;
    case 'command':
    case 'library_command':
      return CommandIcon;
    case 'ad_break':
    case 'library_ad_break':
      return AdIcon;
    default:
      return AudioIcon;
  }
};
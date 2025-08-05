import React from 'react';

import type { IconProps } from '@/components/icons/types';
import { GetMusicClockQuery } from '@/graphql/__generated__/graphql';

// Base clock types from GraphQL
export type QueryMusicClock = NonNullable<GetMusicClockQuery['musicClock']>;
export type QueryMusicClockItem = QueryMusicClock['items'][number];

// Discriminated union types for type-safe clock items
export type TrackClockItem = Extract<
  QueryMusicClockItem,
  { __typename?: 'TrackClockItem' }
>;
export type SubcategoryClockItem = Extract<
  QueryMusicClockItem,
  { __typename?: 'SubcategoryClockItem' }
>;
export type GenreClockItem = Extract<
  QueryMusicClockItem,
  { __typename?: 'GenreClockItem' }
>;
export type NoteClockItem = Extract<
  QueryMusicClockItem,
  { __typename?: 'NoteClockItem' }
>;
export type CommandClockItem = Extract<
  QueryMusicClockItem,
  { __typename?: 'CommandClockItem' }
>;
export type AdBreakClockItem = Extract<
  QueryMusicClockItem,
  { __typename?: 'AdBreakClockItem' }
>;
export type LibraryNoteClockItem = Extract<
  QueryMusicClockItem,
  { __typename?: 'LibraryNoteClockItem' }
>;
export type LibraryCommandClockItem = Extract<
  QueryMusicClockItem,
  { __typename?: 'LibraryCommandClockItem' }
>;
export type LibraryAdBreakClockItem = Extract<
  QueryMusicClockItem,
  { __typename?: 'LibraryAdBreakClockItem' }
>;

// Drag and drop data structures
export interface LibraryItemDragData {
  type: 'library-item';
  itemType: LibraryItemType;
  data: LibraryItemData;
}

export interface GridItemDragData {
  type: 'grid-item';
  item: QueryMusicClockItem;
}

export type DragData = LibraryItemDragData | GridItemDragData;

// Supported library item types
export type LibraryItemType =
  | 'track'
  | 'genre'
  | 'subcategory'
  | 'note'
  | 'command'
  | 'ad_break'
  | 'library_note'
  | 'library_command'
  | 'library_ad_break';

// Library item data structure
export interface LibraryItemData {
  name?: string;
  trackId?: string;
  genreId?: string;
  subcategoryId?: string;
  libraryItemId?: string;
  duration?: number;
  content?: string;
  command?: string;
  scheduledStartTime?: string;
  [key: string]: unknown;
}

// Badge color options
export type BadgeColor =
  | 'blue'
  | 'green'
  | 'red'
  | 'purple'
  | 'gray'
  | 'yellow'
  | 'orange';

// Clock item display information
export interface ClockItemDisplayInfo {
  icon: ({ size, className }: IconProps) => React.JSX.Element;
  title: string;
  typeLabel: string;
  badgeColor: BadgeColor;
  description?: string;
  sourceId: string;
  isUnscheduled?: boolean;
}

// Library item display information
export interface LibraryItemDisplayInfo {
  icon: ({ size, className }: IconProps) => React.JSX.Element;
  title: string;
  typeLabel: string;
  description: string;
}

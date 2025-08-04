import type {
  QueryMusicClockItem,
  TrackClockItem,
  SubcategoryClockItem,
  GenreClockItem,
  NoteClockItem,
  CommandClockItem,
  AdBreakClockItem,
  LibraryNoteClockItem,
  LibraryCommandClockItem,
  LibraryAdBreakClockItem,
} from '../types';

/**
 * Type guard functions for discriminated union types
 */
export const isTrackClockItem = (item: QueryMusicClockItem): item is TrackClockItem => {
  return item.__typename === 'TrackClockItem';
};

export const isSubcategoryClockItem = (item: QueryMusicClockItem): item is SubcategoryClockItem => {
  return item.__typename === 'SubcategoryClockItem';
};

export const isGenreClockItem = (item: QueryMusicClockItem): item is GenreClockItem => {
  return item.__typename === 'GenreClockItem';
};

export const isNoteClockItem = (item: QueryMusicClockItem): item is NoteClockItem => {
  return item.__typename === 'NoteClockItem';
};

export const isCommandClockItem = (item: QueryMusicClockItem): item is CommandClockItem => {
  return item.__typename === 'CommandClockItem';
};

export const isAdBreakClockItem = (item: QueryMusicClockItem): item is AdBreakClockItem => {
  return item.__typename === 'AdBreakClockItem';
};

export const isLibraryNoteClockItem = (item: QueryMusicClockItem): item is LibraryNoteClockItem => {
  return item.__typename === 'LibraryNoteClockItem';
};

export const isLibraryCommandClockItem = (item: QueryMusicClockItem): item is LibraryCommandClockItem => {
  return item.__typename === 'LibraryCommandClockItem';
};

export const isLibraryAdBreakClockItem = (item: QueryMusicClockItem): item is LibraryAdBreakClockItem => {
  return item.__typename === 'LibraryAdBreakClockItem';
};
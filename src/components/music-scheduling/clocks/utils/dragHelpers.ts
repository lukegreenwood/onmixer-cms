import type { QueryMusicClockItem, LibraryItemType, LibraryItemData } from '../types';

/**
 * Check if drag data is for a library item
 */
export const isLibraryItemDrag = (dragData: unknown): dragData is { type: 'library-item'; itemType: LibraryItemType; data: LibraryItemData } => {
  return (
    typeof dragData === 'object' &&
    dragData !== null &&
    'type' in dragData &&
    dragData.type === 'library-item'
  );
};

/**
 * Check if drag data is for a grid item
 */
export const isGridItemDrag = (dragData: unknown): dragData is { type: 'grid-item'; item: QueryMusicClockItem } => {
  return (
    typeof dragData === 'object' &&
    dragData !== null &&
    'type' in dragData &&
    dragData.type === 'grid-item' &&
    'item' in dragData
  );
};
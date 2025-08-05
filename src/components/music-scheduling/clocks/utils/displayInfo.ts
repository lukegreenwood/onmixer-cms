import {
  getTitle,
  getTypeLabel,
  getBadgeColor,
  getSourceId,
  getDescription,
  getLibraryTypeLabel,
  getLibraryDescription,
} from './displayHelpers';
import { getIcon, getLibraryIcon } from './iconHelpers';

import type {
  QueryMusicClockItem,
  LibraryItemType,
  LibraryItemData,
  ClockItemDisplayInfo,
  LibraryItemDisplayInfo,
} from '../types';

/**
 * Get complete display information for a clock item
 */
export const getDisplayInfo = (
  item: QueryMusicClockItem,
): ClockItemDisplayInfo => {
  return {
    icon: getIcon(item),
    title: getTitle(item),
    typeLabel: getTypeLabel(item),
    badgeColor: getBadgeColor(item),
    description: getDescription(item),
    sourceId: getSourceId(item),
    isUnscheduled:
      item.__typename === 'SubcategoryClockItem' ||
      item.__typename === 'GenreClockItem',
  };
};

/**
 * Get complete display information for a library item
 */
export const getLibraryDisplayInfo = (
  itemType: LibraryItemType,
  data: LibraryItemData,
): LibraryItemDisplayInfo => {
  return {
    icon: getLibraryIcon(itemType),
    title: (data.name as string) || 'Item',
    typeLabel: getLibraryTypeLabel(itemType, data),
    description: getLibraryDescription(itemType, data),
  };
};

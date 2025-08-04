import { formatDuration } from './formatting';

import type { QueryMusicClockItem } from '../types';

/**
 * Calculate air time for a clock item at a specific index
 */
export const calculateAirTime = (
  index: number,
  items: QueryMusicClockItem[],
): string => {
  const totalSeconds = items
    .slice(0, index)
    .reduce((accumulator: number, item: QueryMusicClockItem): number => {
      return accumulator + Math.floor(Math.abs(item.duration));
    }, 0);

  return formatDuration(totalSeconds);
};

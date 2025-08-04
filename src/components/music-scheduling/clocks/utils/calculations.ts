import { formatDuration } from './formatting';

import type { QueryMusicClockItem } from '../types';

/**
 * Calculate air time for a clock item at a specific index
 */
export const calculateAirTime = (
  index: number,
  items: QueryMusicClockItem[],
): string => {
  let totalSeconds = 0;
  for (let i = 0; i < index; i++) {
    totalSeconds += Math.floor(Math.abs(items[i].duration));
  }
  return formatDuration(totalSeconds);
};

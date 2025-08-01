import { MusicClockItem, TrackClockItem, SubcategoryClockItem, GenreClockItem, NoteClockItem } from './types';

/**
 * Duration formatting utilities
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const parseDuration = (timeString: string): number => {
  const parts = timeString.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return parts[0] || 0;
};

/**
 * Clock runtime calculations
 */
export const calculateClockRuntime = (items: MusicClockItem[]): number => {
  return items.reduce((total, item) => total + item.duration, 0);
};

/**
 * Type guard functions for clock items
 */
export const isTrackClockItem = (item: MusicClockItem): item is TrackClockItem => {
  return 'trackId' in item && 'track' in item;
};

export const isSubcategoryClockItem = (item: MusicClockItem): item is SubcategoryClockItem => {
  return 'subcategoryId' in item && 'subcategory' in item;
};

export const isGenreClockItem = (item: MusicClockItem): item is GenreClockItem => {
  return 'genreId' in item && 'genre' in item;
};

export const isNoteClockItem = (item: MusicClockItem): item is NoteClockItem => {
  return 'content' in item;
};

/**
 * Get display information for clock items
 */
export const getClockItemDisplayName = (item: MusicClockItem): string => {
  if (isTrackClockItem(item)) {
    return `${item.track.artist} - ${item.track.title}`;
  }
  if (isSubcategoryClockItem(item)) {
    return item.subcategory.name;
  }
  if (isGenreClockItem(item)) {
    return item.genre.name;
  }
  if (isNoteClockItem(item)) {
    return item.name || 'Note';
  }
  // This should never happen if all union types are handled above
  return (item as { name?: string }).name || 'Unknown Item';
};

export const getClockItemType = (item: MusicClockItem): string => {
  if (isTrackClockItem(item)) return 'Track';
  if (isSubcategoryClockItem(item)) return 'Subcategory';
  if (isGenreClockItem(item)) return 'Genre';
  if (isNoteClockItem(item)) return 'Note';
  return 'Unknown';
};

export const calculateRuntimeDifference = (target: number, actual: number) => {
  const diff = actual - target;
  return {
    difference: Math.abs(diff),
    isOver: diff > 0,
    isUnder: diff < 0,
    isPerfect: diff === 0,
    percentage: ((Math.abs(diff) / target) * 100).toFixed(1)
  };
};

/**
 * Week calculation utilities
 */
export const getWeekCommencing = (date: Date): string => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
  const monday = new Date(d.setDate(diff));
  return monday.toISOString().split('T')[0];
};

export const formatWeekCommencing = (weekCommencing: string): string => {
  const date = new Date(weekCommencing);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Rule formatting utilities
 */
export const formatRuleName = (ruleType: string): string => {
  return ruleType
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// Re-export GraphQL generated enums for convenience
export { RuleType, RuleBreakable } from '@/graphql/__generated__/graphql';

/**
 * Color utilities
 */
export const getDefaultClockColor = (): string => '#FF6B6B';

export const isValidHexColor = (color: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
};

/**
 * Day of week utilities
 */
export const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const DAYS_OF_WEEK_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const getDayName = (dayOfWeek: number, short: boolean = false): string => {
  const days = short ? DAYS_OF_WEEK_SHORT : DAYS_OF_WEEK;
  return days[dayOfWeek] || 'Unknown';
};

/**
 * Time formatting utilities
 */
export const formatHour = (hour: number): string => {
  return `${hour.toString().padStart(2, '0')}:00`;
};

export const formatTime = (hour: number, minute: number = 0): string => {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
};
export interface ClockItem {
  id: string;
  name: string;
  duration: number;
  orderIndex?: number;
  type?: string;
  __typename?: string;
  // Music Slot fields
  categories?: string[] | null;
  category?: string; // Single category field
  genres?: string[] | null; // Keep for backward compatibility
  genre?: string; // Single genre field
  priority?: number;
  musicPriority?: number;
  allowOverrun?: boolean;
  isFromCategory?: boolean; // Flag to indicate if this came from category drag
  // Note Block fields
  content?: string;
  notePriority?: string;
  color?: string | null;
  // Ad Break fields
  adType?: string;
  isFixed?: boolean;
  // Station Ident fields
  identType?: string;
  trackId?: string | null;
}

export interface MusicClock {
  id: string;
  name: string;
  description?: string | null;
  duration: number;
  isTemplate: boolean;
  items?: ClockItem[];
}

export interface MusicRule {
  id: string;
  name: string;
  description?: string;
  ruleType: string;
  breakable: string;
  value: number;
  unit: string;
  priority: number;
  isActive: boolean;
  criteria?: {
    categories?: string[];
    genres?: string[];
    artists?: string[];
    tags?: string[];
    timeWindows?: TimeWindow[];
  };
}

export interface TimeWindow {
  startHour: number;
  endHour: number;
  daysOfWeek: string[];
}
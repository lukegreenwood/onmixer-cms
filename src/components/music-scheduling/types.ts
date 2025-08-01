// Base clock item interface
export interface BaseMusicClockItem {
  id: string;
  clockId: string;
  orderIndex: number;
  duration: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Specific clock item types
export interface TrackClockItem extends BaseMusicClockItem {
  trackId: string;
  track: {
    id: string;
    title: string;
    artist: string;
    duration: {
      formatted: string;
    };
    album?: string;
  };
}

export interface SubcategoryClockItem extends BaseMusicClockItem {
  subcategoryId: string;
  subcategory: {
    id: string;
    name: string;
    parentId?: string;
  };
  averageDuration: number;
}

export interface GenreClockItem extends BaseMusicClockItem {
  genreId: string;
  genre: {
    id: string;
    name: string;
  };
  averageDuration: number;
}

export interface NoteClockItem extends BaseMusicClockItem {
  content: string;
  color?: string | null;
}

// Union type for all clock items
export type MusicClockItem = TrackClockItem | SubcategoryClockItem | GenreClockItem | NoteClockItem;

// Input types for creating clock items
export interface CreateTrackClockItemInput {
  trackId: string;
  orderIndex: number;
  duration: number;
  name: string;
}

export interface CreateSubcategoryClockItemInput {
  subcategoryId: string;
  orderIndex: number;
  duration: number;
  name: string;
  averageDuration: number;
}

export interface CreateGenreClockItemInput {
  genreId: string;
  orderIndex: number;
  duration: number;
  name: string;
  averageDuration: number;
}

export interface CreateNoteClockItemInput {
  orderIndex: number;
  duration: number;
  name: string;
  content: string;
  color?: string | null;
}

export type CreateClockItemInput = 
  | CreateTrackClockItemInput 
  | CreateSubcategoryClockItemInput 
  | CreateGenreClockItemInput 
  | CreateNoteClockItemInput;

// Legacy interface for backward compatibility during migration
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

// New clock interface
export interface MusicClock {
  id: string;
  name: string;
  description?: string | null;
  color: string; // hex color picker
  targetRuntime: number; // seconds, default 3600
  networkId?: string | null; // null for global clocks
  items: MusicClockItem[];
  network?: {
    id: string;
    name: string;
  } | null;
  createdAt?: string;
  updatedAt?: string;
}

// Input type for creating/updating clocks
export interface CreateMusicClockInput {
  name: string;
  description?: string;
  color: string;
  targetRuntime: number;
  networkId?: string;
  items: CreateClockItemInput[];
}

// Legacy interface for backward compatibility
export interface LegacyMusicClock {
  id: string;
  name: string;
  description?: string | null;
  duration: number;
  isTemplate: boolean;
  items?: ClockItem[];
}

// Import GraphQL generated enums instead of defining locally
import { RuleType, RuleBreakable } from '@/graphql/__generated__/graphql';

export interface MusicRule {
  id: string;
  name: string;
  description?: string;
  ruleType: RuleType;
  breakable: RuleBreakable;
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

// New interfaces for template assignments and weekly overrides
export interface TemplateAssignment {
  id: string;
  templateId?: string;
  clockId?: string | null;
  dayOfWeek: number; // 0-6 (Sunday = 0)
  hour: number; // 0-23
  clock?: {
    id: string;
    name: string;
    color?: string;
    targetRuntime: number;
  };
}

export interface WeeklyOverride {
  id: string;
  networkId: string;
  templateId: string;
  clockId?: string | null; // null = remove clock for this slot
  weekCommencing: string; // YYYY-MM-DD (Monday)
  dayOfWeek: number; // 0-6
  hour: number; // 0-23
  reason?: string;
  clock?: {
    id: string;
    name: string;
    color: string;
  };
}

// Scheduling job configuration
export interface SchedulingJobConfig {
  networkId: string;
  startDate: string;
  endDate: string;
  dryRun: boolean; // default to dry run
  playlistNameFormat: string; // configurable format
  removePastPlaylists: boolean;
  skipUnbreakableRules: boolean;
}

// Schedule preview interfaces
export interface ScheduleItem {
  id: string;
  orderIndex: number;
  itemType: 'track' | 'note';
  trackId?: string;
  track?: {
    id: string;
    title: string;
    artist: string;
    duration: number;
  };
  noteContent?: string;
  duration: number;
  startTime: string;
  ruleViolations: RuleViolation[];
}

export interface RuleViolation {
  ruleId: string;
  ruleName: string;
  ruleType: string;
  severity: 'unbreakable' | 'breakable';
  description: string;
  conflictTrackId?: string;
  conflictTime?: string;
}

export interface MusicSchedule {
  id: string;
  networkId: string;
  scheduledDate: string;
  hour: number;
  clockId?: string;
  playlistName: string;
  exportedToRadioDj: boolean;
  ruleViolations: RuleViolation[];
  items: ScheduleItem[];
  clock?: {
    id: string;
    name: string;
    color: string;
    targetRuntime: number;
  };
}
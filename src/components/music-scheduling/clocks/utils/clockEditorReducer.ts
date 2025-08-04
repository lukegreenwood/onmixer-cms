import type { QueryMusicClockItem, DragData } from '../types';
import type { UniqueIdentifier } from '@dnd-kit/core';

// State interface
export interface ClockEditorState {
  clockItems: QueryMusicClockItem[];
  isClockDialogOpen: boolean;
  activeId: UniqueIdentifier | null;
  activeItem: DragData | null;
  insertionIndex: number | null;
}

// Action types
export type ClockEditorAction =
  | { type: 'SET_CLOCK_ITEMS'; payload: QueryMusicClockItem[] }
  | { type: 'ADD_CLOCK_ITEM'; payload: QueryMusicClockItem }
  | { type: 'UPDATE_CLOCK_ITEM'; payload: { id: string; item: QueryMusicClockItem } }
  | { type: 'REMOVE_CLOCK_ITEM'; payload: string }
  | { type: 'REORDER_CLOCK_ITEMS'; payload: { oldIndex: number; newIndex: number } }
  | { type: 'SET_CLOCK_DIALOG_OPEN'; payload: boolean }
  | { type: 'SET_ACTIVE_ID'; payload: UniqueIdentifier | null }
  | { type: 'SET_ACTIVE_ITEM'; payload: DragData | null }
  | { type: 'SET_INSERTION_INDEX'; payload: number | null }
  | { type: 'START_DRAG'; payload: { id: UniqueIdentifier; item: DragData } }
  | { type: 'END_DRAG' }
  | { type: 'RESET_STATE' };

// Initial state factory
export const createInitialClockEditorState = (
  initialClockItems: QueryMusicClockItem[] = [],
): ClockEditorState => ({
  clockItems: initialClockItems,
  isClockDialogOpen: false,
  activeId: null,
  activeItem: null,
  insertionIndex: null,
});

// Reducer function
export const clockEditorReducer = (
  state: ClockEditorState,
  action: ClockEditorAction,
): ClockEditorState => {
  switch (action.type) {
    case 'SET_CLOCK_ITEMS':
      return {
        ...state,
        clockItems: action.payload,
      };

    case 'ADD_CLOCK_ITEM':
      return {
        ...state,
        clockItems: [...state.clockItems, action.payload],
      };

    case 'UPDATE_CLOCK_ITEM':
      return {
        ...state,
        clockItems: state.clockItems.map((item) =>
          item.id === action.payload.id ? action.payload.item : item,
        ),
      };

    case 'REMOVE_CLOCK_ITEM':
      return {
        ...state,
        clockItems: state.clockItems.filter((item) => item.id !== action.payload),
      };

    case 'REORDER_CLOCK_ITEMS': {
      const { oldIndex, newIndex } = action.payload;
      const newClockItems = [...state.clockItems];
      const [reorderedItem] = newClockItems.splice(oldIndex, 1);
      newClockItems.splice(newIndex, 0, reorderedItem);
      
      return {
        ...state,
        clockItems: newClockItems,
      };
    }

    case 'SET_CLOCK_DIALOG_OPEN':
      return {
        ...state,
        isClockDialogOpen: action.payload,
      };

    case 'SET_ACTIVE_ID':
      return {
        ...state,
        activeId: action.payload,
      };

    case 'SET_ACTIVE_ITEM':
      return {
        ...state,
        activeItem: action.payload,
      };

    case 'SET_INSERTION_INDEX':
      return {
        ...state,
        insertionIndex: action.payload,
      };

    case 'START_DRAG':
      return {
        ...state,
        activeId: action.payload.id,
        activeItem: action.payload.item,
      };

    case 'END_DRAG':
      return {
        ...state,
        activeId: null,
        activeItem: null,
        insertionIndex: null,
      };

    case 'RESET_STATE':
      return createInitialClockEditorState();

    default:
      return state;
  }
};
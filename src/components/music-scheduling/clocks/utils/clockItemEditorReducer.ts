import type { QueryMusicClockItem } from '../types';

// State interface
export interface ClockItemEditorState {
  editingItem: QueryMusicClockItem | null;
  activeId: string | null;
  selectedCategory: string | null;
}

// Action types
export type ClockItemEditorAction =
  | { type: 'SET_EDITING_ITEM'; payload: QueryMusicClockItem | null }
  | { type: 'SET_ACTIVE_ID'; payload: string | null }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string | null }
  | { type: 'RESET_STATE' };

// Initial state
export const initialClockItemEditorState: ClockItemEditorState = {
  editingItem: null,
  activeId: null,
  selectedCategory: null,
};

// Reducer function
export const clockItemEditorReducer = (
  state: ClockItemEditorState,
  action: ClockItemEditorAction,
): ClockItemEditorState => {
  switch (action.type) {
    case 'SET_EDITING_ITEM':
      return {
        ...state,
        editingItem: action.payload,
      };

    case 'SET_ACTIVE_ID':
      return {
        ...state,
        activeId: action.payload,
      };

    case 'SET_SELECTED_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case 'RESET_STATE':
      return initialClockItemEditorState;

    default:
      return state;
  }
};
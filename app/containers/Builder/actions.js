/*
 *
 * Builder actions
 *
 */

import {
  DEFAULT_ACTION,
  HANDLE_SIDEBAR_STATE,
  HANDLE_SECONDARY_SIDEBAR_STATE,
  GET_DEFAULT_THEME,
  UPDATE_EDITOR_STATE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
/**
 * @description function to handle Sidebar State
 */
export function toggleSidebar() {
  return {
    type: HANDLE_SIDEBAR_STATE,
  };
}
/**
 * @description function to handle Secondary Sidebar
 */
export function toggleSecondarySidebar() {
  return {
    type: HANDLE_SECONDARY_SIDEBAR_STATE,
  };
}
/**
 * @description function to be dispatched when new theme added
 */
export function getBuilderTheme(theme) {
  return {
    type: GET_DEFAULT_THEME,
    theme,
  };
}
 /** 
  * @description function to update editor state
 */
export function updateEditorState(editor_state) {
  return {
    type: UPDATE_EDITOR_STATE,
    editor_state,
  };
}


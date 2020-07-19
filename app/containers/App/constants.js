/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const TOGGLE_MODAL = 'app/TOGGLE_MODAL';
export const UPDATE_PUBLISH_TYPE = 'app/UPDATE_PUBLISH_TYPE';
export const TOGGLE_HEADER_USER_PILL = 'app/TOGGLE_HEADER_USER_PILL';
export const UPDATE_IN_USERDATA = 'app/UPDATE_IN_USERDATA';
export const AUTHENTICATE_USER = 'app/AUTHENTICATE_USER';

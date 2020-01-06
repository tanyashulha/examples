import actionTypes from './types';

export const setPreviewFPS = event => ({
  type: actionTypes.SET_PREVIEW_FPS,
  value: event.target.value
});
import actionTypes from './types';

export const addFrame = () => ({
  type: actionTypes.ADD_FRAME,
  frame: {
    active: true,
    image: ''
  }
});

export const setActiveFrame = index => ({
  type: actionTypes.SET_ACTIVE_FRAME,
  index
});

export const cloneFrame = index => ({
  type: actionTypes.CLONE_FRAME,
  index
});

export const deleteFrame = index => ({
  type: actionTypes.DELETE_FRAME,
  index
});

export const saveFrame = canvas => ({
  type: actionTypes.SAVE_FRAME,
  image: canvas.toDataURL()
});
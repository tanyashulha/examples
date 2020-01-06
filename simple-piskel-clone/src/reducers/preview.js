import actionTypes from '../actions/types';

const FPS = (state = 1, action) => {
  switch (action.type) {
    case actionTypes.SET_PREVIEW_FPS:
      return action.value
    default:
      return state
  }
}

export default FPS;
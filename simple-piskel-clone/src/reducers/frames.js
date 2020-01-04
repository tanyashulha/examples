import actionTypes from '../actions/types';

const defaultState = [{
  active: true,
  image: ''
}];

const getActiveFrame = frames => {
  return frames.find(frame => frame.active);
};

const frames = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.ADD_FRAME:
      getActiveFrame(state).active = false;
      return [
        ...state,
        action.frame
      ];

    case actionTypes.SET_ACTIVE_FRAME:
      getActiveFrame(state).active = false;
      state[action.index].active = true;
      return [...state];

    case actionTypes.CLONE_FRAME:
      getActiveFrame(state).active = false;
      const frame = {
        ...state.find((frame, index) => index === action.index),
        active: true
      }
      return [
        ...state,
        frame
      ];
    
    case actionTypes.DELETE_FRAME:
      if (state.length > 1) {
        if (state[action.index].active) {
          if (!action.index) {
            state[1].active = true;
          } else {
            state[0].active = true;
          }
        }

        return [...state.filter((frame, index) => index !== action.index)]
      }
      return state;
    
    case actionTypes.SAVE_FRAME:
      getActiveFrame(state).image = action.image;
      return [...state];

    default:
      return state;
  }
}

export default frames;
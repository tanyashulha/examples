import actionTypes from '../actions/types';

const defaultState = {
  primary: "#222",
  secondary: "#EEE"
}

const colors = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRIMARY_COLOR:
      return {
        ...state,
        primary: action.color
      }
    case actionTypes.SET_SECONDARY_COLOR:
      return {
        ...state,
        secondary: action.color
      }
    case actionTypes.SWAP_COLORS:
      return {
        primary: state.secondary,
        secondary: state.primary
      }
    default:
      return state;
  }
}

export default colors;
import actionTypes from './types';

export const setPrimaryColor = color => ({
  type: actionTypes.SET_PRIMARY_COLOR,
  color
});

export const setSecondaryColor = color => ({
  type: actionTypes.SET_SECONDARY_COLOR,
  color
});

export const swapColors = () => ({
  type: actionTypes.SWAP_COLORS
});
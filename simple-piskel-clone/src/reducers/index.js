import { combineReducers } from 'redux';
import activeTool from './tools';
import canvas from './canvas';
import colors from './colors';

const appReducer = combineReducers({
  activeTool,
  canvas,
  colors
})

export default appReducer;
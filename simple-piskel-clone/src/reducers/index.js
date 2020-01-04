import { combineReducers } from 'redux';
import activeTool from './tools';
import canvas from './canvas';
import colors from './colors';
import frames from './frames';

const appReducer = combineReducers({
  activeTool,
  canvas,
  colors,
  frames
})

export default appReducer;
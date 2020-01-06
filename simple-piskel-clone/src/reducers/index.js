import { combineReducers } from 'redux';
import activeTool from './tools';
import canvas from './canvas';
import frames from './frames';
import FPS from './preview';
import colors from './colors';


const appReducer = combineReducers({
  activeTool,
  canvas,
  frames,
  FPS,
  colors
})

export default appReducer;
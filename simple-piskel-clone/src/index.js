import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './reducers';
import { loadState, saveState } from './localstorage';
import App from './App';
import './index.css';

const persistedState = loadState();
const store = createStore(appReducer, persistedState);
store.subscribe(() => {
  saveState({
    ...store.getState()
  });
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
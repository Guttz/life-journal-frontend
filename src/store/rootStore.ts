import { createStore, applyMiddleware } from 'redux';
import { saveState, loadState } from './../utils/localStorage';

// Logger with default options
import logger from 'redux-logger';

import { rootReducer } from './rootState';

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const persistedState = loadState();
  const store = createStore(rootReducer, persistedState, applyMiddleware(logger));

  let throttleTime = new Date().getTime();

  store.subscribe(() => {
    if (new Date().getTime() - throttleTime > 1000) {
      throttleTime = new Date().getTime();
      saveState(store.getState());
    }
  });

  return store;
}

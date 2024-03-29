import { createStore, applyMiddleware } from 'redux';
import { saveState } from './../utils/localStorage';

// Logger with default options
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { rootReducer } from './rootState';

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  //const persistedState = loadState();
  const store = createStore(rootReducer, {}, applyMiddleware(logger, thunk));

  let throttleTime = new Date().getTime();

  store.subscribe(() => {
    if (new Date().getTime() - throttleTime > 1000) {
      throttleTime = new Date().getTime();
      saveState(store.getState());
    }
  });

  return store;
}

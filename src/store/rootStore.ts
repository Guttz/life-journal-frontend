import { createStore, combineReducers, applyMiddleware } from 'redux';

// Logger with default options
import logger from 'redux-logger';

import { rootReducer } from './rootState';

export type RootState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(logger));
  return store;
}
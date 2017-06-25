import React from 'react';
import createLogger from 'redux-logger';

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import {routerReducer, routerMiddleware} from 'react-router-redux';

import promiseMiddleware from './middlewares/promise_middleware';
import * as reducers from './reducers';

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

export function configure (history, initialState = {}) {
  
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });
  
  const middlewares = [promiseMiddleware, routerMiddleware(history)];
  
  if (process.env.NODE_ENV === "development" && process.env.REDUX_DEBUG === true) {
    const logger = createLogger();
    middlewares.push(logger);
  }

  return createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middlewares)
    )
  );
}

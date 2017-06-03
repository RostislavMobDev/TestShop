import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import { reducer as formReducer } from 'redux-form';

import auth from './auth';
import sagas from './sagas';
import products from './products';

const logger = createLogger();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
  form: formReducer,
  auth,
  products,
}), applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(sagas);

export default store;
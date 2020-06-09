import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// thunk middleware, каждый раз, когда мы диспатчим функцию, вместо объекта, thunk вызывает эту функцию с методом dispath, который идет первым аргументом
import logger from 'redux-logger';
import { persistStore } from 'redux-persist'; //Для сохранения store в storage

import rootReducer from './root-reducer';
import rootSaga from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

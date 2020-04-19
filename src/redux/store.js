import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// thunk middleware, каждый раз, когда мы диспатчим функцию, вместо объекта, thunk вызывает эту функцию с методом dispath, который идет первым аргументом
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import { persistStore } from 'redux-persist'; //Для сохранения store в storage

const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'; //Версия редьюсера для сохранения в storage
import storage from 'redux-persist/lib/storage'; //localStorage

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

//Конфиг для использования localStorage
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'] //Какая часть store будет сохраняться в storage
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);

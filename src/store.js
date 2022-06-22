import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
//import counterReducer from '../features/counter/counterSlice';
import thunk from 'redux-thunk';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)


export const store = configureStore({
  reducer: persistedReducer,
  //devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)


/*
 const store = configureStore({
  reducer: {
    cart: cartReducer,
    counter: counterReducer,
  },
});

export default store;
*/
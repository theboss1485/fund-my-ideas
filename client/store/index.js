// This file initializes the redux store.
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import paymentReducer from './slices/paymentSlice';

const persistConfig = {
    key: 'root',
    storage,
  };

const persistedReducer = persistReducer(persistConfig, paymentReducer);

export const store = configureStore({reducer: persistedReducer});

export const persistor = persistStore(store);
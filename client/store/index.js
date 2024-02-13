// This file initializes the redux store.
import { configureStore} from '@reduxjs/toolkit'
import { persistStore, 
         persistReducer,
         FLUSH,
         REHYDRATE,
         PAUSE,
         PERSIST,
         PURGE,
         REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import paymentReducer from './slices/paymentSlice';

const persistConfig = {
    key: 'root',
    storage,
  };

const persistedReducer = persistReducer(persistConfig, paymentReducer);

export const store = configureStore(
    {
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, 
                                 REHYDRATE, 
                                 PAUSE, 
                                 PERSIST, 
                                 PURGE, 
                                 REGISTER]
            }
        })
    });

export const persistor = persistStore(store);
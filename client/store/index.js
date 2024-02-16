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

import rootReducer from './reducers/rootReducer';

/* Here, we initialize a persistant configuration for the purposes of making our reducer persistant
across multiple page refreshes.*/
const persistConfig = {
    key: 'root',
    storage,
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* Here, we initialize the store with the persistant reducer.
We add in extra middlewhere to avoid a console error I was running into.*/
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
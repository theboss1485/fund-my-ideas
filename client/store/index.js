// This file initializes the redux store.
import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice';

const store = configureStore({reducer: userReducer});

export default store;
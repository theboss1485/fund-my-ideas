import paymentReducer from './slices/paymentSlice'
import userReducer from './slices/userSlice'
import { combineReducers } from '@reduxjs/toolkit'

// This function combines the reducers from the three slice files into one large reducer.
const rootReducer = combineReducers({

    payments: paymentReducer,
    users: userReducer,
})

export default rootReducer;
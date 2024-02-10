import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({

    name: 'user',
    initialState: {

        loggedIn: false,
        loggedInUserName: ''

    },

    reducers: {

        logOutUser: function (state, action){

            state.loggedIn = false;
            state.loggedInUserName = ''
            return state;
        },

        logInUser: function (state, action){

            state.loggedIn = true;
            state.loggedInUserName = action.payload.username;
            return state;
        }
    }
})

export const {logInUser, logOutUser} = userSlice.actions

export default userSlice.reducer;
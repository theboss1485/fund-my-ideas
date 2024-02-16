import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({

    name: 'user',
    initialState: {

        loggedInUser: null
    },

    reducers: {

        setLoggedInUser: function(state, action){

            state.loggedInUser = action.payload.user;
            return state;
        }
    }
})

export const {setLoggedInUser} = userSlice.actions;
export default userSlice.reducer;


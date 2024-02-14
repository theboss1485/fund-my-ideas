import { createSlice } from '@reduxjs/toolkit'

// Here we create a store slice to hold the information of the latest payment made in the application.
const paymentSlice = createSlice({

    name: 'payment',
    initialState: {

        newestPayment: {
            projectId: '',
            paymentAmount: 0,
            sessionId: ''
        }

    },

    reducers: {

        // This reducer updates the store with the latest payment information.
        updateLatestPayment: function (state, action){

            console.log("inside reducer");

            state.newestPayment = {

                projectId: action.payload.projectId,
                paymentAmount: action.payload.paymentAmount,
                sessionId: action.payload.sessionId
            }

            console.log("state inside reducer", state);

            return state;
        },
    }
})

export const {updateLatestPayment} = paymentSlice.actions

export default paymentSlice.reducer;
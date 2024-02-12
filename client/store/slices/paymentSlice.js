import { createSlice } from '@reduxjs/toolkit'

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
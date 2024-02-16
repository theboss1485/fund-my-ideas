import { UPDATE_PROJECT_FUNDS } from "../utils/mutations";

import { useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* This page deals with with calling the database to update the 
amount of funds a project has, and then redirecting the user to the home page.*/
const PaymentSuccess = () => {

    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);

    const sessionId = queryParams.get('session_id');

    const newestPayment = useSelector((state) => 
    {
        console.log("state", state);
        return state.payments.newestPayment
    });

    const [updateProjectFunds, {loading, error, data}] = useMutation(UPDATE_PROJECT_FUNDS);

    // This function actually calls the mutation that updates the database.
    const handleUpdatingProjectFunds = async () => {

        if((newestPayment.sessionId === sessionId) && (newestPayment.projectId !== '')){

            try{
    
                await updateProjectFunds({
                    
                    variables: {

                        projectId: newestPayment.projectId, 
                        fundChangeAmount: newestPayment.paymentAmount
                    }
                });

                // After five seconds, the user is redirected to the home page.
                setTimeout(() => {
                    
                    window.location.href = "/"
                    
                  }, "5000");

    
            } catch (error) {
    
                console.log("Something went wrong with updating the project funds in the database.");
            }
        }
    }


    /* On page load, the function is called to update the database with the new funds of the project
    that was just backed.*/
    useEffect(() => {

        handleUpdatingProjectFunds();

    }, [newestPayment])

    // This return statement displays a 'payment successful' message to the user.
    return (
        <div className="text-center text-white mb-3">
            {data && (
                <>
                    <p>Your payment was successful. You will now be redirected to our home page. </p>
                    <p>Project Name: {data.updateProjectFunds.name}</p>
                    <p>Funding Goal: {data.updateProjectFunds.fundingGoal}</p>
                    <p>Current Funding Amount: {data.updateProjectFunds.currentFundingAmount}</p>
                    <p>Remaining Funding Needed: {data.updateProjectFunds.fundingGoal - data.updateProjectFunds.currentFundingAmount}</p>
                </>
            )}
        </div>
    )
}

export default PaymentSuccess;
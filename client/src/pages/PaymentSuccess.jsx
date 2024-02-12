import { UPDATE_PROJECT_FUNDS } from "../utils/mutations";

import { useMutation } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updateLatestPayment } from "../../store/slices/paymentSlice";

export default function PaymentSuccess() {

    const location = useLocation();

    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(location.search);

    const sessionId = queryParams.get('session_id');

    const newestPayment = useSelector((state) => state.newestPayment);

    const [updateProjectFunds, {loading, error, data}] = useMutation(UPDATE_PROJECT_FUNDS);
    const [projectWithUpdatedFunding, setProjectWithUpdatedFunding] = useState(null);
    const [updateCalled, setUpdateCalled] = useState(false);
    
    //const [projectFundsUpdated, setProjectFundsUpdated] = useState(false);

    const handleUpdatingProjectFunds = async () => {

        if((newestPayment.sessionId === sessionId) && (newestPayment.projectId !== '')){

            try{

                console.log("newestPayment", newestPayment)
    
                let {data} = await updateProjectFunds({
                    
                    variables: {

                        projectId: newestPayment.projectId, 
                        fundChangeAmount: newestPayment.paymentAmount
                    }
                });

                console.log("data", data);

                setUpdateCalled(true);

                console.log("updateCalled", updateCalled)

                setTimeout(() => {
                    
                    window.location.href = "/"
                  }, "5000");

    
            } catch (error) {
    
                console.log("error", JSON.stringify(error));
            }
        }
    }



    useEffect(() => {

        console.log("inside");

        handleUpdatingProjectFunds();

    }, [])
    return (
        <div className="text-center">
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
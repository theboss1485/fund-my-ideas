import { useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';

import { GET_PROJECT_BY_ID } from '../utils/queries';
import { QUERY_CHECKOUT } from '../utils/queries';
import { ADD_COMMENT } from '../utils/mutations';
import { useSelector, useDispatch } from 'react-redux';

import Project from '../components/Project';
import Comment from '../components/Comment'
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth'

import { updateLatestPayment } from '../../store/slices/paymentSlice';




export default function SingleProjectWithComments(props) {

    const [getCheckout, { data: checkoutData, error: checkoutError }] = useLazyQuery(QUERY_CHECKOUT);

    const { projectId } = useParams();

    const [commentRemoved, setCommentRemoved] = useState(false);

    const [addComment, {loading: commentAdditionLoading, error: commentAdditionError}] = useMutation(ADD_COMMENT);
    const {data, loading: projectLoading, error: projectError, refetch} = useQuery(GET_PROJECT_BY_ID, {

        variables: { projectId: projectId }
    });

    const [loggedIn, setLoggedIn] = useState(false);


    const [displayCommentForm, setDisplayCommentForm] = useState(false);
    const [displayPaymentWindow, setDisplayPaymentWindow] = useState(false);
    const [commentAdded, setCommentAdded] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [paymentAmount, setPaymentAmount] = useState(0);

    const dispatch = useDispatch();

    const toggleCommentForm = () => {

        if(displayCommentForm){

            setDisplayCommentForm(false);

        } else if(!displayCommentForm){

            setDisplayCommentForm(true);
        }
    }

    const togglePaymentWindow = () => {

        if(displayPaymentWindow){

            setDisplayPaymentWindow(false);

        } else if(!displayPaymentWindow){

            setDisplayPaymentWindow(true);
        }
    }

    const proceedToCheckout = async(event) => {

        event.preventDefault();

        let project = {
            id: projectId,
            name: data.projectById.name,
            description: data.projectById.description,
            fundingGoal: data.projectById.fundingGoal,
            timePeriod: data.projectById.timePeriod
          };
        
        try {

            await getCheckout({

                variables: {project: project, paymentAmount: paymentAmount}
            })
    
            //window.location.replace(checkoutUrl); 
        
        } catch (error){

            console.log("Something went wrong with the payment process.");
        }

        
    }

    useEffect(() => {

        if (checkoutData) {

            console.log("inside effect");

            const sessionId = checkoutData.checkout.session;

            const checkoutUrl = checkoutData.checkout.url

            dispatch(updateLatestPayment({

                sessionId: sessionId,
                projectId: projectId,
                paymentAmount: paymentAmount
            }))

            window.location.replace(checkoutUrl);
        }

    }, [checkoutData]);

    useEffect(() => {

        if(commentAdded && projectId) {

            setCommentAdded(false);
            refetch()
        }

        if(commentRemoved  && projectId) {

            setCommentRemoved(false)
            refetch();
        }

    }, [commentAdded, commentRemoved])

    const location = useLocation();

    
    const submitComment = async () => {

        try{

            console.log("projectId", projectId)
            console.log("new comment", commentText);

            let newComment = await addComment({
                
                variables: {

                    projectId: projectId,
                    commentText: commentText
                }
            })

            if(newComment){

                setCommentAdded(true);
            }

        } catch(error) {

            console.log("Something went wrong with adding a comment.");
        }
        

        toggleCommentForm()
    }

    const handleCommentRemoved = () => {

        setCommentRemoved(true)
    }

    const handleCommentChange = (event) => {

        setCommentText(event.target.value)
    }

    const handleAmountChange = (event) => {

        setPaymentAmount(parseFloat(event.target.value))
    }

    return (

        <div>
            {projectLoading ? (
                <p>Loading...</p>
            ) : projectError ? (
                <p>Error: {JSON.stringify(projectError)}</p>
            ) : (
                <div>
                    <Project {...data.projectById}/>
                    {data.projectById.comments.map((item, index) => (
                        <Comment key={index} {...item} onCommentRemoval={handleCommentRemoved}/>
                    ))}

                    {Auth.loggedIn() && !displayPaymentWindow && (

                        <button onClick={togglePaymentWindow}> Back This Project</button>
                    )}

                    {Auth.loggedIn() && displayPaymentWindow && (

                            <div>
                                <label for="amount">Amount:</label>
                                <input type="number" 
                                    id="amount" 
                                    name="amount" 
                                    step="0.01" 
                                    min="0.01" 
                                    max={`${data.projectById.remainingFundingNeeded}`}
                                    onChange={handleAmountChange}
                                    required 
                                />
                                <button onClick={proceedToCheckout}>Proceed to Checkout</button>
                            </div>
                    )}



                    {!displayCommentForm && Auth.loggedIn() && (
                        <button className="btn btn-outline-primary" onClick={toggleCommentForm}>Leave a Comment</button>
                    )}

                    

                    {displayCommentForm && Auth.loggedIn() && (
                        <div>
                            <label for="comment-form">Add a Comment</label>
                            <input id="comment-form" type="text" onChange={handleCommentChange}></input>
                            <button className="btn btn-outline-primary" onClick={submitComment}>Submit</button>
                        </div>
                        
                    )}

                    {!Auth.loggedIn() && (

                        <p>You must <a href="/login">log in</a> or <a href="/signup">sign up</a> to leave a comment.</p>
                    )}
                    
                </div>
            )}
        </div>
    )
}
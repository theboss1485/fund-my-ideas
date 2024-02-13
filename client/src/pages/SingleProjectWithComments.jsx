import { useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';

import { GET_PROJECT_BY_ID } from '../utils/queries';
import { QUERY_CHECKOUT } from '../utils/queries';
import { ADD_COMMENT } from '../utils/mutations';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

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

                    <div className="custom-buttons-container">

                    {Auth.loggedIn() && !displayPaymentWindow && (

                    <button onClick={togglePaymentWindow} className="custom-back-this-project-button"> Back This Project</button>
                    )}

                    {Auth.loggedIn() && displayPaymentWindow && (

                    <div className='custom-proceed-to-checkout-button-container'>
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

                    </div>

                    {data.projectById.comments.map((item, index) => (
                        <Comment key={uuidv4()} {...item} onCommentRemoval={handleCommentRemoved}/>
                    ))}
    
                        <div className="custom-buttons-container custom-margin-bottom-3">

                            {!displayCommentForm && Auth.loggedIn() && (
                                <button className="btn btn-outline-primary custom-leave-a-comment-button" onClick={toggleCommentForm}>Leave a Comment</button>
                            )}

                        </div>

                        {displayCommentForm && Auth.loggedIn() && (
                            <div className="custom-buttons-container-for-add-a-comment">
                                <label for="comment-form">Add a Comment</label>
                                <textarea id="comment-form" type="text" onChange={handleCommentChange}></textarea>
                                <button className="btn btn-outline-primary custom-leave-a-comment-button" onClick={submitComment}>Submit</button>
                            </div>
                            
                        )}
                    
                    {!Auth.loggedIn() && (

                        <p className="custom-leave-comment-alert">You must &#160;<a href="/login">log in</a>&#160; or &#160;<a href="/signup">sign up</a>&#160; to leave a comment.</p>
                    )}
                    
                </div>
            )}
        </div>
    )
}
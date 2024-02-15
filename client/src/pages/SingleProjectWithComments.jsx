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



/* This function deals with rendering a single project on the page,
along with all the comments associated with that project.*/
const SingleProjectWithComments = (props) => {

    const [getCheckout, { data: checkoutData, error: checkoutError }] = useLazyQuery(QUERY_CHECKOUT);

    const { projectId } = useParams();

    const [commentRemoved, setCommentRemoved] = useState(false);

    const [formError, setFormError] = useState(false);
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

    /* This function switches the displayCommentForm variable to the 
    inverse of what it was previously so as to add the comment form to
    or remove it from the page.*/
    const toggleCommentForm = () => {

        if(displayCommentForm){

            setDisplayCommentForm(false);

        } else if(!displayCommentForm){

            setDisplayCommentForm(true);
        }
    }

    /* This function switches the displayPaymentWindow variable to the 
    inverse of what it was previously so as to add the payment window to
    or remove it from the page.*/
    const togglePaymentWindow = () => {

        if(displayPaymentWindow){

            setDisplayPaymentWindow(false);

        } else if(!displayPaymentWindow){

            setDisplayPaymentWindow(true);
        }
    }

    /* This function is called when the user clicks the Proceed to Checkout button
    for backing a project.*/
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

            /* This function call deals with getting everthing ready to proceed 
            with the Stripe checkout process.*/
            await getCheckout({

                variables: {project: project, paymentAmount: paymentAmount}
            })
        
        } catch (error){

            console.log("Something went wrong with the payment process.");
        }

        
    }

    useEffect(() => {

        /* If the Stripe checkout data was initialized successfully, the store
        is updated with the latest payment information.  This information is used
        to render the Payment Success page.*/
        if (checkoutData) {

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

    /* If a comment is removed, the commentAdded or commentRemoved variable
    is updated and the data is refetched so as to update the page.*/
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

    /* This function is called when the user submits a new comment.
    The function adds the comment to the database.*/
    const submitComment = async () => {

        try{

            if(commentText.trim() === ""){

                throw new Error("You didn't enter a comment!")
            }

            let newComment = await addComment({
                
                variables: {

                    projectId: projectId,
                    commentText: commentText.trim()
                }
            })

            if(newComment){

                setCommentAdded(true);
                toggleCommentForm();
            }

            if(commentAdditionError){

                throw new Error("Something went wrong with the comment creation process.");
            }

            setCommentText("");

        } catch(error) {

            setFormError(error)
        }
    }

    /* If a comment is removed, we set the commentRemoved variable to true 
    so as to update the page and refetch the comment data.*/
    const handleCommentRemoved = () => {

        setCommentRemoved(true)
    }

    /* If the text inside the add comment box changes, this function is called,
    so that the text in the box is kept track of appropriately.*/
    const handleCommentChange = (event) => {

        setCommentText(event.target.value)
    }

    /* If the text inside the payment amount box changes, this function is called,
    so that the amount in the box is kept track of appropriately.*/
    const handleAmountChange = (event) => {

        setPaymentAmount(parseFloat(event.target.value))
    }
    
    // Here, we render the single project with all of its comments.
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

                            <button onClick={togglePaymentWindow} className="btn custom-back-this-project-button"> Back This Project</button>
                        )}

                        {Auth.loggedIn() && displayPaymentWindow && (

                            <div className='custom-proceed-to-checkout-button-container'>
                                <label htmlFor="amount">Amount:</label>
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

                    {!displayCommentForm && Auth.loggedIn() && (

                        <div className="custom-buttons-container custom-margin-bottom-3">
                            <button className="btn btn-outline-primary custom-leave-a-comment-button" onClick={toggleCommentForm}>Leave a Comment</button>
                        </div>
                    )}

                    {displayCommentForm && Auth.loggedIn() && (

                        <>
                            <div className="custom-buttons-container custom-margin-bottom-3">
                                <button className="btn btn-outline-primary custom-leave-a-comment-button" onClick={toggleCommentForm}>Close Add Comment Box</button>
                            </div>
                            <div className="custom-buttons-container-for-add-a-comment">
                                <label htmlFor="comment-form" className='text-white'>Add a Comment</label>
                                <textarea id="comment-form" type="text" onChange={handleCommentChange} className='custom-text-area text-white'></textarea>
                                <button className="btn btn-outline-primary custom-leave-a-comment-button" onClick={submitComment}>Submit</button>
                            </div>
                        </>
                    )}

                    {(formError) && (
            
                        <div className="my-1 p-3 custom-error-message text-white col-lg-3 col-md-5 col-sm-6 col-11 mx-auto">
                            {formError.message}
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

export default SingleProjectWithComments;
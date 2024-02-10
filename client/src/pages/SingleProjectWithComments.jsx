import { useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { GET_PROJECT_BY_ID } from '../utils/queries';
import { ADD_COMMENT } from '../utils/mutations';

import Project from '../components/Project';
import Comment from '../components/Comment'
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth'



export default function SingleProjectWithComments(props) {

    const { projectId } = useParams();

    const [commentRemoved, setCommentRemoved] = useState(false);

    const [addComment, {loading: commentAdditionLoading, error: commentAdditionError}] = useMutation(ADD_COMMENT);
    const {data, loading: projectLoading, error: projectError, refetch} = useQuery(GET_PROJECT_BY_ID, {

        variables: { projectId: projectId }
    });

    const [loggedIn, setLoggedIn] = useState(false);


    const [displayCommentForm, setDisplayCommentForm] = useState(false);
    const [commentAdded, setCommentAdded] = useState(false);
    const [commentText, setCommentText] = useState('');

    const toggleCommentForm = () => {

        if(displayCommentForm){

            setDisplayCommentForm(false);

        } else if(!displayCommentForm){

            setDisplayCommentForm(true);
        }
    }

    useEffect(() => {

        if(commentAdded) {

            setCommentAdded(false);
            refetch()
        }

        if(commentRemoved) {

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

    const handleChange = (event) => {

        setCommentText(event.target.value)
    }

    return (

        <div>
            {projectLoading ? (
                <p>Loading...</p>
            ) : projectError ? (
                <p>Error: {projectError.message}</p>
            ) : (
                <div>
                    <Project {...data.projectById}/>
                    {data.projectById.comments.map((item, index) => (
                        <Comment key={index} {...item} onCommentRemoval={handleCommentRemoved}/>
                    ))}

                    {!displayCommentForm && Auth.loggedIn() && (
                        <button className="btn btn-outline-primary" onClick={toggleCommentForm}>Leave a Comment</button>
                    )}

                    

                    {displayCommentForm && Auth.loggedIn() && (
                        <div>
                            <label for="comment-form">Add a Comment</label>
                            <input id="comment-form" type="text" onChange={handleChange}></input>
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
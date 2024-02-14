import { REMOVE_COMMENT } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {useMutation } from '@apollo/client';

// This is the Comment component that is used for creating comments.
const Comment = (props) => {

    const [removeComment, {loading, error, refetch}] = useMutation(REMOVE_COMMENT);

    const { projectId } = useParams();

    // This function handles the client-side logic for deleting comments.
    const deleteComment = async (event) => {

        try{

            let removedComment = await removeComment({
                
                variables: {
    
                    projectId: projectId,
                    commentId: event.target.dataset.id
                }
            })
    
            if(removedComment){
    
                props.onCommentRemoval()
            }
        
        } catch(error) {

            console.log(error);
        }
    }

    return (

        <section className="custom-comment-tab">
            
            <p className="custom-comment-sections">{props.commentText}</p>
            <p>Created by <a className="custom-comment-username">{props.username}</a> on <a className="custom-comment-date">{props.createdAt}</a></p>
            <button className="btn btn-primary" data-id={`${props._id}`} onClick={deleteComment}>Remove Comment</button>
        </section>
    )
}

export default Comment;
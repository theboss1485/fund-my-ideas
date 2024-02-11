import { REMOVE_COMMENT } from '../utils/mutations';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {useMutation } from '@apollo/client';

export default function Comment(props) {

    const [removeComment, {loading, error, refetch}] = useMutation(REMOVE_COMMENT);

    const { projectId } = useParams();

    console.log(props)

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

            console.log(JSON.stringify(error));
        }
    }

    return (

        <section className="custom-tab has-text-centered">
            
            <p>{props.commentText}</p>
            <p>Created by {props.username} on {props.createdAt}</p>
            <button className="btn btn-primary" data-id={`${props._id}`} onClick={deleteComment}>Remove Comment</button>
        </section>
    )
}
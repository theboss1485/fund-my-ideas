import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!){
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`

export const ADD_PROJECT = gql`
    mutation addProject($name: String!, $description: String!, $fundingGoal: Int! timePeriod: Int){
        addProject(username: $username, email: $email, password: $password){
            _id
            name
            description
            fundingGoal
            timePeriod
        }
    }
`

export const ADD_COMMENT = gql`
    mutation addComment($projectId: String!, $commentText: String){
        addComment(projectId: $projectId, commentText: $commentText){
            _id
            commentText
        }
    }
`
export const REMOVE_PROJECT = gql`
    mutation removeProject($projectId: String!){
        removeProject(projectId: $projectId){
            _id
            name
            description
            fundingGoal
            timePeriod
        }
    }
`
export const REMOVE_COMMENT = gql`
    mutation removeComment($commentId: String!){
        removeComment(commentId: $commentId){
            _id
            commentText
        }
    }
`
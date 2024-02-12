import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password) {
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
                email
            }
        }
    }
`

export const ADD_PROJECT = gql`
    mutation addProject($name: String!, $description: String!, $fundingGoal: Int! $timePeriod: Int){
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
    mutation addComment($projectId: String!, $commentText: String!){
        addComment(projectId: $projectId, commentText: $commentText){
            comment {
                _id
                commentText
            }
            project {
                _id
                name,
                description
                fundingGoal
                timePeriod
                comments {
                    _id
                    commentText
                }
            }
        }
    }
`

export const UPDATE_PROJECT_FUNDS = gql`
    mutation updateProjectFunds($projectId: String!, $fundChangeAmount: Float!){
        updateProjectFunds(projectId: $projectId, fundChangeAmount: $fundChangeAmount){
            _id
            name
            description
            fundingGoal
            currentFundingAmount
            timePeriod
            comments {
                _id
                commentText
            }
        }
    }
`   

export const REMOVE_PROJECT = gql`
    mutation removeProject($projectId: String!){
        removeProject(projectId: $projectId){
            project{
                _id
                name
                description
                fundingGoal
                timePeriod
            }
            user {
                _id
                username
                email
            }
        }
    }
`
export const REMOVE_COMMENT = gql`
    mutation removeComment($projectId: String!, $commentId: String!){
        removeComment(projectId: $projectId, commentId: $commentId){
            comment {
                _id
                commentText
            }
            project {
                _id
                name
                description
                fundingGoal
                timePeriod
                comments {
                    _id
                    commentText
                }
            }
        }
    }
`
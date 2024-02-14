import { gql } from '@apollo/client';

// This mutation is for logging the user into the application.
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

// This mutation is for adding a new user when one signs up.
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
// This mutation is for adding a new project to the application.
export const ADD_PROJECT = gql`
    mutation addProject($name: String!, $description: String!, $fundingGoal: Int! $timePeriod: Int!){
        addProject(name: $name, description: $description, fundingGoal: $fundingGoal, timePeriod: $timePeriod){
            project {
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
// This mutation is for adding a new comment to a project.
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
// This mutation is for updating the amount of funds a project has.
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
// This mutation is for removing a project from the application.
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
// This mutation is for removing a comment from a project.
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
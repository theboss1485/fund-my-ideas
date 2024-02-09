import { gql } from '@apollo/client';

// This is the definition of the query to get the logged in user's information.
export const GET_ME = gql`
    query me {
        me {
            _id
            email
            username
            Projects {
                name
                description
                fundingGoal
                timePeriod
            }
        }
    }
`;

export const GET_USER = gql`
    query getUser {
        getUser {
            _id
            email
            username
            Projects {
                name
                description
                fundingGoal
                timePeriod
            }
        }
    }
`;

export const GET_PROJECTS = gql`
    query getProjects {
        projects {
            name
            description
            fundingGoal
            timePeriod
        }
    }
`;

export const GET_PROJECT = gql`
    query getProject {
        getProject {
            name
            description
            fundingGoal
            timePeriod
        }
    }
`;

export const GET_COMMENT = gql`
    query getComment {
        getComment {
            _id
            commentText
        }
    }
`



export const GET_COMMENTS = gql`
    query getComments {
        getComments {
            _id
            commentText
        }
    }
`
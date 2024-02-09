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

export const GET_ALL_PROJECTS = gql`
    query getAllProjects {
        allProjects {
            _id
            name
            description
            fundingGoal
            timePeriod
        }
    }
`;

export const GET_PROJECTS_BY_USERNAME = gql`
    query getProjectsByUsername($username: String!){
        projectsByUsername(username: $username) {
            _id
            name
            description
            fundingGoal
            timePeriod
        }
    }
`;

export const GET_PROJECT_BY_ID = gql`
    query getProjectById($projectId: String!) {
        projectById(projectId: $projectId){
            name
            description
            fundingGoal
            timePeriod
            comments {
                commentText
                username
                createdAt
            }
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
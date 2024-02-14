import { gql } from '@apollo/client';

// This query gets the logged in user's information from the database.
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

// This query gets all the projects from the database.
export const GET_ALL_PROJECTS = gql`
    query getAllProjects {
        allProjects {
            _id
            name
            description
            fundingGoal
            currentFundingAmount
            timePeriod
        }
    }
`;

// This query gets all the projects under a certain username from the database.
export const GET_PROJECTS_BY_USERNAME = gql`
    query getProjectsByUsername($username: String!){
        projectsByUsername(username: $username) {
            _id
            name
            description
            fundingGoal
            currentFundingAmount
            timePeriod
        }
    }
`;

// This query gets a specific project from the database, using the project's ID.
export const GET_PROJECT_BY_ID = gql`
    query getProjectById($projectId: String!) {
        projectById(projectId: $projectId){
            name
            description
            fundingGoal
            currentFundingAmount
            timePeriod
            comments {
                _id
                commentText
                username
                createdAt
            }
        }
    }
`;

// This query gets the Stripe checkout process ready.
export const QUERY_CHECKOUT = gql`
    query getCheckout($project: ProjectToBeContributedTo!, $paymentAmount: Float!) {
        checkout(project: $project, paymentAmount: $paymentAmount) {
            session
            url
        }
    }
`;
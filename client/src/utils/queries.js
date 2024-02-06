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

export
// This file contains the GraphQL type definitions in order to make the queries and mutations work properly.
const typeDefs = `

    type User {
        _id: ID
        username: String
        email: String
        password: String
        projects: [Project]
    }

    type Project {
        _id: ID
        name: String!
        description: String!
        fundingGoal: Int!
        currentFundingAmount: Float!
        timePeriod: Int!
        createdAt: String
        comments: [Comment]!
    }

    type Comment {
        _id: ID
        commentText: String
        username: String
        createdAt: String
    }

    type Checkout {
        session: ID!
        url: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type CommentWithProject {
        comment: Comment!
        project: Project!
    }

    type UserWithProject {
        user: User!
        project: Project!
    }

    input ProjectToBeContributedTo {
        id: String!
        name: String!
        description: String!
        fundingGoal: Int!
        timePeriod: Int!
    }

    type Query {
        me: User
        user(username: String!): User
        allProjects: [Project]
        projectsByUsername(username: String!): [Project]
        projectById(projectId: String!): Project
        comments(projectId: String!): [Comment]
        comment(commentId: ID!): Comment
        checkout(project: ProjectToBeContributedTo!, paymentAmount: Float! ): Checkout
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addProject(name: String!, description: String!, fundingGoal: Int!, timePeriod: Int!): UserWithProject
        addComment(projectId: String!, commentText: String!): CommentWithProject
        updateProjectFunds(projectId: String!, fundChangeAmount: Float!): Project
        removeProject(projectId: String!): UserWithProject
        removeComment(projectId: String!, commentId: String!): CommentWithProject
    }
`;

module.exports = typeDefs;
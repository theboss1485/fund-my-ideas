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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String!): User
    allProjects: [Project]
    projectsByUsername(username: String!): [Project]
    projectById(projectId: String!): Project
    comments(projectId: String!): [Comment]
    comment(commentId: ID!): Comment
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProject(name: String!, description: String!, fundingGoal: Int!, timePeriod: Int!): Project
    addComment(projectId: ID!, commentText: String!): Comment
    removeProject(projectId: ID!): Project
    removeComment(projectId: ID!, commentId: ID!): Comment
  }
`;

module.exports = typeDefs;
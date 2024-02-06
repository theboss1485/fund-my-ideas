const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    projects: [Project]!
  }

  type Project {
    _id: ID
    projectText: String
    projectAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String!): User
    comments(username: String): [Comment]
    comment(thoughtId: ID!): Comment
    
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
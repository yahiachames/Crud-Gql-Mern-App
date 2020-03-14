const { gql } = require("apollo-server-express");
var typeDefs = gql`
  type Query {
    users: [User!]
  }
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int!
  }
  type Mutation {
    initUser: User
    addUser(name: String!, email: String!, age: Int!): User!
    deleteUser(id: ID!): User!
    updateUser(id: ID!, name: String, email: String, age: Int): User!
  }
`;
module.exports = typeDefs;

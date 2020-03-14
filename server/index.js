const express = require("express");
const resolvers = require("./graphqlAPI/resolvers");
const typeDefs = require("./graphqlAPI/typeDefs");
const http = require("http");
const mongoose = require("mongoose");
const { ApolloServer, gql, PubSub } = require("apollo-server-express");
const db = require("./db");
const app = express();
mongoose.Promise = global.Promise;

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const httpServer = http.createServer(app);
const path = "/graphql";
server.applyMiddleware({ app, path });
server.installSubscriptionHandlers(httpServer);
httpServer.listen(5000, () =>
  console.log(`server is working on http://localhost:5000${server.graphqlPath}`)
);

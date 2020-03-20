import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Test from "./Test";
// integrate graphql Apis
import { gql, ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import { ApolloProvider } from "@apollo/react-hooks";
import * as serviceWorker from "./serviceWorker";
// redux

const httpLink = new HttpLink({
  uri: "http://localhost:5000/graphql"
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink
});

client
  .query({
    query: gql`
      {
        users {
          id
          name
          email
          age
          imgLink
        }
      }
    `
  })
  .then(res => {
    console.log(res);
  })
  .catch(e => console.log(e));

ReactDOM.render(
  <ApolloProvider client={client}>
    {" "}
    <Test />{" "}
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

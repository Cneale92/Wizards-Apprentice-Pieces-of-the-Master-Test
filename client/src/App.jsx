import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client";
import { Game } from "./scenes/GameScene";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Game />
    </ApolloProvider>
  );
};

export default App;

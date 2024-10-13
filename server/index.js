const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      return { user };
    }
  },
});

server.applyMiddleware({ app });

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen({ port: 4000 }, () => {
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      );
    });
  });

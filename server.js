const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const port = 5000;

const typeDefs = gql`
  type event {
    id: ID
    title: String
    description: String
  }

  type Query {
    getEvents: [event]
  }
`;

const resolvers = {
  Query: {
    getEvents: async () => {
      return [
        {
          id: 1,
          title: "my name is mandela",
          description: "not for your choose",
        },
      ];
    },
  },
};

const startServer = async () => {
  const app = express();
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });

  app.use((req, res) => {
    res.send("the server is running now");
  });

  await mongoose.connect("mongodb://localhost:27017/my_db", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("mongoose connect  successfully");

  app.listen(port, () => {
    console.log("the server was running port " + port);
  });
};

startServer();

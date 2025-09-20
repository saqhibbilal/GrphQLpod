const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema/typeDefs');
const { resolvers } = require('./resolvers/resolvers');

const app = express();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // We'll add database context here later
    return {
      // db: database connection will go here
    };
  },
});

// Apply Apollo Server middleware
async function startServer() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

// Start server
const PORT = process.env.PORT || 4000;

startServer().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`📊 GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

module.exports = app;

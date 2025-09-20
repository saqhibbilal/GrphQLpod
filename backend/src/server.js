const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema/typeDefs');
const { resolvers } = require('./resolvers/resolvers');
const database = require('./database/connection');

const app = express();

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {
      db: database
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

async function start() {
  try {
    // Initialize database
    await database.init();
    
    // Start Apollo Server
    await startServer();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
      console.log(`📊 GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`);
      console.log(`🗄️  Database connected and ready`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();

module.exports = app;

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema, addMocksToSchema } from '@graphql-tools/schema';
import { typeDefs } from './schema';
import { mockResolvers } from './mockResolvers';

// Create executable schema with mock resolvers
const schema = makeExecutableSchema({
  typeDefs,
  resolvers: mockResolvers
});

// Add mocks to schema for any missing fields
const schemaWithMocks = addMocksToSchema({
  schema,
  mocks: {
    String: () => 'Mocked string',
    Int: () => 42,
    Float: () => 3.14,
    Boolean: () => true,
    ID: () => 'mock-id'
  },
  preserveResolvers: true // Keep our custom resolvers
});

// Create Apollo Client with mock schema
export const client = new ApolloClient({
  link: new SchemaLink({ schema: schemaWithMocks }),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore'
    },
    query: {
      errorPolicy: 'all'
    }
  }
});

// For future use when connecting to real backend:
// export const client = new ApolloClient({
//   link: createHttpLink({
//     uri: 'http://localhost:4000/graphql'
//   }),
//   cache: new InMemoryCache()
// });

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { typeDefs } from './schema';
import { mockResolvers } from './mockResolvers';

// Configuration flag - set to true to use real backend
const USE_REAL_BACKEND = false;

// Mock Apollo Client
const createMockClient = () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: mockResolvers
  });

  const schemaWithMocks = addMocksToSchema({
    schema,
    mocks: {
      String: () => 'Mocked string',
      Int: () => 42,
      Float: () => 3.14,
      Boolean: () => true,
      ID: () => 'mock-id'
    },
    preserveResolvers: true
  });

  return new ApolloClient({
    link: new SchemaLink({ schema: schemaWithMocks }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: { errorPolicy: 'ignore' },
      query: { errorPolicy: 'all' }
    }
  });
};

// Real Backend Apollo Client
const createRealClient = () => {
  return new ApolloClient({
    link: createHttpLink({
      uri: 'http://backend:4000/graphql'
    }),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: { errorPolicy: 'all' },
      query: { errorPolicy: 'all' }
    }
  });
};

// Export the appropriate client based on configuration
export const client = USE_REAL_BACKEND ? createRealClient() : createMockClient();

// Export configuration for debugging
export const isUsingRealBackend = USE_REAL_BACKEND;

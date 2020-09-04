// Imports
import { ApolloServer } from 'apollo-server-express';

// App Imports
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const server = new ApolloServer({
  typeDefs: [typeDefs],
  resolvers,
});

export function startGraphQLServer(app) {
  server.applyMiddleware({ app });
  console.log(`GraphQL Server ready at: ${server.graphqlPath}`);
}

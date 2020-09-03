import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './book';

const server = new ApolloServer({
  typeDefs: [typeDefs],
});

export function startGraphQLServer(app) {
  server.applyMiddleware({ app });
  console.log(`GraphQL Server ready at: ${server.graphqlPath}`);
}

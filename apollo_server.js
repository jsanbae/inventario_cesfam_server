import { ApolloServer } from '@apollo/server';
import typeDefs from './graphql/typedefs.js';
import resolvers from './graphql/resolvers.js';

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers   
});

export default apolloServer;
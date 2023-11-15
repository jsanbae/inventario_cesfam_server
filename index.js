import 'dotenv/config';
import { jwtDecode } from "jwt-decode";
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';
import mongodbServer from './mongodb_server.js';
import apolloServer from './apollo_server.js';
import ModelRegistry from './database/modelRegistry.js';


// Use async function because the database connections can only be retrieved in an asynchronous way
const startServer = async () => {
  
  const { url } = await startStandaloneServer(apolloServer, {
    name: 'Inventario',
    version: '1.0',
    listen: { port: 4000 },
    context: async ({ req }) => ({
      // add the user to the context
      authUser: () => {
        // get the user token from the headers
        const token = req.headers.authorization || '';
        // console.log(token, req.body.query)
        if (!token && !req.body.query.includes("loginUser")) {
            throw new GraphQLError('User is not authenticated', {
              extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
              },
            })
        }

        if (token === '') return null;
        
        // try to retrieve a user with the token
        const user = jwtDecode(token);
        
        return user
      },
      dataSources: {
        models: ModelRegistry,
      },
    }),
  });
  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
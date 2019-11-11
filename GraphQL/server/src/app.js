import 'dotenv/config';
import {ApolloServer} from 'apollo-server';

import mongose from 'mongose';

import schema from './schema';

const server = new ApolloServer({
  schema,
  playground: process.env.NODE_ENV === 'development';
});

mongose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

export default server;

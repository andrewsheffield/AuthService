/* @flow */
import 'babel-polyfill';
import Hapi from 'hapi';
import mongoose from 'mongoose';
import { load as loadEnv } from 'dotenv';
import routes from './Handlers';
import plugins from './plugins';
import consoleTime from 'console-stamp';
import Bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Auth } from './Models';
import path from 'path';
import { getKey } from './Services';

consoleTime(console, {
  pattern: 'dd/mm/yyyy HH:MM:ss.l',
  colors: {
    stamp: 'yellow'
  }
});

if (process.env.NODE_ENV !== 'production') {
  loadEnv();
}

const port = process.env.PORT || 3000;

const server = new Hapi.server({ port });

server.route(routes);

const validate = async function(decoded, request) {
  if (decoded.user) {
    return { isValid: true, credentials: decoded.user };
  } else {
    return { isValid: false };
  }
};

const init = async () => {
  await server.register(plugins);

  server.auth.strategy('jwt', 'jwt', {
    key: getKey(), // Never Share your secret key
    validate: validate // validate function defined above
  });

  server.auth.default('jwt');

  server.start();
};

init()
  .then(() => {
    console.log('App Started');
  })
  .catch(err => {
    console.log(err);
  });

const mongoUser = process.env.MONGO_USER || 'user';
const mongoPw = process.env.MONGO_PW || 'password';
const mongoUri = process.env.MONGO_URI || 'localhost:27017';
const mongoDbName = process.env.MONGO_DB_NAME || 'my-db';

mongoose.connect(
  `mongodb://${mongoUser}:${mongoPw}@${mongoUri}/${mongoDbName}`
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('CONNECTED TO THE DB!!!');
});

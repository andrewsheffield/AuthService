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
import database from './database';

consoleTime(console, {
  pattern: 'dd/mm/yyyy HH:MM:ss.l',
  colors: {
    stamp: 'yellow'
  }
});

if (process.env.NODE_ENV !== 'production') {
  loadEnv();
}

const validate = async function(decoded, request) {
  if (decoded.user) {
    return { isValid: true, credentials: decoded.user };
  } else {
    return { isValid: false };
  }
};

const init = async () => {
  const port = process.env.PORT || 3000;
  const server = new Hapi.server({ port });

  server.route(routes);

  await server.register(plugins);

  server.auth.strategy('jwt', 'jwt', {
    key: getKey(), // Never Share your secret key
    validate: validate // validate function defined above
  });

  server.auth.default('jwt');

  const [serverStart, db] = await Promise.all([server.start(), database()]);
  return server;
};

init()
  .then(server => {
    console.log(`Server started: ${server.info.uri}`);
  })
  .catch(err => {
    console.log(err);
  });

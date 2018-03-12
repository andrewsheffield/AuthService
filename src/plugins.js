/* @flow */
import Good from 'good';
import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import AuthJWT2 from 'hapi-auth-jwt2';
import { version } from '../package.json';

const swaggerOptions = {
  info: {
    title: 'Auth API Documentation',
    version: version
  }
};

const plugins = [
  AuthJWT2,
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: swaggerOptions
  },
  {
    plugin: Good,
    options: {
      reporters: {
        myConsoleReporter: [
          {
            module: 'good-console'
          },
          'stdout'
        ]
      }
    }
  }
];

export default plugins;

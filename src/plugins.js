/* @flow */
import Good from 'good';
import Inert from 'inert';
import Vision from 'vision';
import HapiSwagger from 'hapi-swagger';
import AuthJWT2 from 'hapi-auth-jwt2';

const swaggerOptions = {
  schemes: ['http'],
  host: 'localhost:3000',
  info: {
    title: 'Test API Documentation',
    version: '1.0.0'
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

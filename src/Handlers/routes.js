/* @flow */
import BaseHandler from './Base';
import LoginRoutes from './Login';
import SignupRoutes from './Signup';

const BaseRoute = [
  {
    method: 'GET',
    path: '/',
    handler: BaseHandler,
    config: {
      auth: false,
      tags: ['api'] // ADD THIS TAG FOR HAPISWAGGER
    }
  }
];

const routes = [].concat(LoginRoutes, SignupRoutes, BaseRoute);

export default routes;

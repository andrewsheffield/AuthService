/* @flow */
import Joi from 'joi';
import ManualLogin from './ManualLogin';
import VerifyEmail from './VerifyEmail';

const routes = [
  {
    method: 'POST',
    path: '/Login/ManualLogin',
    handler: ManualLogin,
    config: {
      auth: false,
      tags: ['api'], // ADD THIS TAG FOR HAPISWAGGER
      validate: {
        payload: {
          email: Joi.string()
            .email()
            .required(),
          password: Joi.string(),
          refreshToken: Joi.string()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/Login/VerifyEmail',
    handler: VerifyEmail,
    config: {
      auth: false,
      tags: ['api'], // ADD THIS TAG FOR HAPISWAGGER
      validate: {
        query: {
          email: Joi.string()
            .email()
            .required(),
          key: Joi.string().required()
        }
      }
    }
  }
];

export default routes;

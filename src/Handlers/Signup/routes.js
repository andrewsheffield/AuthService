/* @flow */
import CheckUsernameAvailability from './CheckUsernameAvailability';
import SendNewVerifyEmail from './SendNewVerifyEmail';
import ManualSignup from './ManualSignup';
import Joi from 'joi';

const routes = [
  {
    method: 'GET',
    path: '/Signup/CheckUsernameAvailability',
    handler: CheckUsernameAvailability,
    config: {
      auth: false,
      tags: ['api'], // ADD THIS TAG FOR HAPISWAGGER
      validate: {
        query: {
          email: Joi.string()
            .email()
            .required()
        }
      }
    }
  },
  {
    method: 'PUT',
    path: '/Signup/SendNewVerifyEmail',
    handler: SendNewVerifyEmail,
    config: {
      auth: false,
      tags: ['api'], // ADD THIS TAG FOR HAPISWAGGER
      validate: {
        payload: {
          email: Joi.string()
            .email()
            .required()
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/Signup/ManualSignup',
    handler: ManualSignup,
    config: {
      auth: false,
      tags: ['api'], // ADD THIS TAG FOR HAPISWAGGER
      validate: {
        payload: {
          firstName: Joi.string().required(),
          lastName: Joi.string().required(),
          email: Joi.string()
            .email()
            .required(),
          password: Joi.string()
            .regex(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$#!%*?&])[A-Za-z\d$@#$!%*?&]{8,30}/g
            )
            .required()
        }
      }
    }
  }
];

export default routes;

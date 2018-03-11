/* @flow */
import Joi from 'joi';
import ManualLogin from './ManualLogin';
import VerifyEmail from './VerifyEmail';
import SendNewResetPasswordEmail from './SendNewResetPasswordEmail';
import ResetPassword from './ResetPassword';

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
  },
  {
    method: 'PUT',
    path: '/Login/SendNewResetPasswordEmail',
    handler: SendNewResetPasswordEmail,
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
    path: '/Login/ResetPassword',
    handler: ResetPassword,
    config: {
      auth: false,
      tags: ['api'], // ADD THIS TAG FOR HAPISWAGGER
      validate: {
        payload: {
          email: Joi.string()
            .email()
            .required(),
          key: Joi.string().required(),
          newPassword: Joi.string()
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

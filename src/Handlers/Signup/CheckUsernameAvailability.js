/* @flow */
import { Auth } from '../../Models';

type Request = {
  query: {
    email: string
  },
  auth: {
    credentials: {
      _id: string,
      firstName: string,
      lastName: string
    }
  }
};

export default async function(request: Request, h: Object) {
  const { email } = request.query;
  console.log(request.auth.credentials);
  // If user exists return 409 conflict
  if (await Auth.findOne({ email: email })) {
    return h.response({ message: 'User already exists' }).code(409);
  } else {
    return { message: 'Username is available' };
  }
}

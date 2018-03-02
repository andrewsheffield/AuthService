/* @flow */
import { Auth } from '../../Models';

type Request = {
  query: {
    email: string,
    key: string
  }
};

export default async function(request: Request, h: Object) {
  const { email, key } = request.query;

  const auth = await Auth.findOne({ email: email });

  if (!auth) {
    return h.response({ message: 'Email not found' }).code(404);
  }

  if (auth.emailVerifiedKey === key) {
    auth.emailVerified = true;
    await auth.save();
    return { message: 'Email has been verified' };
  } else {
    return h.response({ message: 'Key is invalid' }).code(400);
  }
}

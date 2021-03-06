/* @flow */
import shortid from 'shortid';
import { Auth } from '../../Models';
import { VerifyEmail } from '../../Services';

import type { AuthType } from '../../Models';

type Request = {
  payload: {
    email: string
  }
};

export default async function(request: Request, h: Object) {
  const { email } = request.payload;

  const auth = await Auth.findOne({ email: email });
  if (!auth) {
    return h.response({ message: 'Email not in the system.' }).code(404);
  }
  auth.emailVerifiedKey = shortid.generate();

  // Attempt to save Auth, delete user if auth save is unsuccessful
  await auth.save();

  // Attempt to send email, delete user and auth if save in unsuccessful
  await VerifyEmail(email, auth.emailVerifiedKey);

  return { message: 'New verify email sent' };
}

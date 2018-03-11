/* @flow */
import { Auth } from '../../Models';
import bcrypt from 'bcrypt';

type Request = {
  payload: {
    email: string,
    key: string,
    newPassword: ?string
  }
};

export default async function(request: Request, h: Object) {
  const { email, key, newPassword } = request.payload;
  const SALT_ROUNDS: number = 8;

  const auth = await Auth.findOne({ email: email });

  if (!auth) {
    return h.response({ message: 'Email not found' }).code(404);
  }

  if (auth.resetPasswordKey && auth.resetPasswordKey === key) {
    auth.hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    auth.resetPasswordKey = null;
    await auth.save();
    return { message: 'Password has been reset' };
  } else {
    return h.response({ message: 'Key is invalid' }).code(400);
  }
}

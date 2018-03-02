/* @flow */
import bcrypt from 'bcrypt';
import { User, Auth } from '../../Models';
import { VerifyEmail } from '../../Services';

// Define Types
import type { UserType, AuthType } from '../../Models';

type Request = {
  payload: {
    firstName: string,
    lastName: string,
    email: string,
    password: string
  }
};

export default async function(request: Request, h: Object) {
  const { firstName, lastName, email, password } = request.payload;
  const SALT_ROUNDS: number = 8;

  // If user exists return 409 conflict
  if (await Auth.findOne({ email: email })) {
    return h.response({ message: 'User already exists' }).code(409);
  }

  // Build new User object
  const user: UserType = new User({
    firstName: firstName,
    lastName: lastName
  });

  // Save user and hashaedpassword
  const [savedUser: UserType, hashedPassword: string] = await Promise.all([
    user.save(),
    bcrypt.hash(password, SALT_ROUNDS)
  ]);

  // Build new Auth object
  const auth: AuthType = new Auth({
    email: email,
    hashedPassword: hashedPassword,
    user: savedUser
  });

  // Attempt to save Auth, delete user if auth save is unsuccessful
  try {
    await auth.save();
  } catch (error) {
    console.error('Could not save Auth:', error);
    await user.remove();
    return error;
  }

  // Attempt to send email, delete user and auth if save in unsuccessful
  try {
    await VerifyEmail(email, auth.emailVerifiedKey);
  } catch (error) {
    console.error('Could not send email');
    await Promise.all([user.remove(), auth.remove()]);
    return error;
  }

  return user;
}

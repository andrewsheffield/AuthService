/* @flow */
import mongoose, { Schema } from 'mongoose';
import shortid from 'shortid';
import { type UserType } from './User';

export type AuthType = {
  __v: number,
  _id: string,
  emailVerified: boolean,
  emailVerifiedKey: string,
  resetPasswordKey: string,
  creationDate: string,
  email: string,
  hashedPassword: string,
  refreshTokens: Array<string>,
  user: UserType,
  save: () => AuthType,
  remove: () => {}
};

var authSchema = new Schema({
  email: { type: String, index: true },
  hashedPassword: String,
  emailVerified: { type: Boolean, default: false },
  emailVerifiedKey: { type: String, default: shortid.generate },
  resetPasswordKey: String,
  creationDate: { type: Date, default: Date.now },
  refreshTokens: [String],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Auth = mongoose.model('Auth', authSchema);

export { Auth };

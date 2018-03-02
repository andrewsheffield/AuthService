/* @flow */
import mongoose, { Schema } from 'mongoose';

export type UserType = {
  __v: number,
  _id: string,
  firstName: string,
  lastName: string,
  save: () => UserType,
  remove: () => {}
};

var userSchema = new Schema({
  firstName: String,
  lastName: String
});

const User = mongoose.model('User', userSchema);

export { User };

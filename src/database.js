/* @flow */

import mongoose from 'mongoose';

export default async function() {
  const mongoUser = process.env.MONGO_USER || 'user';
  const mongoPw = process.env.MONGO_PW || 'password';
  const mongoUri = process.env.MONGO_URI || 'localhost:27017';
  const mongoDbName = process.env.MONGO_DB_NAME || 'my-db';

  await mongoose.connect(
    `mongodb://${mongoUser}:${mongoPw}@${mongoUri}/${mongoDbName}`
  );

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));

  console.log('Connected to the Database');
  return db;
}

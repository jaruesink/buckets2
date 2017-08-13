const logger = require('tracer').colorConsole();

import { app, connection, services } from './test_helpers';
import { BucketData, BucketType, BucketSchema } from '../../server/models/bucket';
import { UserData, UserType, UserSchema } from '../../server/models/user';
import { DocumentQuery, Query } from "mongoose";

const BucketModel = connection.model<BucketType>('Bucket', BucketSchema);
const UserModel = connection.model<UserType>('User', UserSchema);

const { user: UserService } = services;

export const createNewUser = function(data:UserData): UserType {
  return new UserModel(data);
}

export const createUserService = function(data:UserData) {
  return UserService.create(data, (err) => { if (err) { logger.debug('error:', err); } });
}

export const countUsers = function(query = {}): Query<number> {
  return UserModel.count(query);
}

export const findOneUser = function(user_id): DocumentQuery<UserType, UserType> {
  return UserModel.findOne({ _id: user_id });
}

export const removeUserService = function(id) {
  return UserService.remove(id, (err) => { if (err) { logger.debug('error:', err); } });
}

export const saveUser = function(user): Promise<UserType> {
  return user.save();
}

export const updateUserService = function(id, data) {
  return UserService.update(id, data, (err) => { if (err) { logger.debug('error:', err); } });
}
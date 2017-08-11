import undefined from '../controllers/user_test';
import * as logger from '../../server/logger';
import { app, connection } from './test_helpers';
import { BucketData, BucketSchema, BucketType } from '../../server/models/bucket';
import { UserData, UserSchema, UserType } from '../../server/models/user';
import { DocumentQuery, Query } from "mongoose";

const BucketModel = connection.model<BucketType>('Bucket', BucketSchema);
const UserModel = connection.model<UserType>('User', UserSchema);

const user_service = app.service('api/user');

export const createNewUser = function(data:UserData): UserType {
  return new UserModel(data);
}

export const createUserService = function(data:UserData) {
  return user_service.create(data, (err) => { if (err) { logger.debug('error:', err); } });
}

export const countUsers = function(query = {}): Query<number> {
  return UserModel.count(query);
}

export const findOneUser = function(user_id): DocumentQuery<UserType, UserType> {
  return UserModel.findOne({ _id: user_id });
}

export const removeUserService = function(id) {
  return user_service.remove(id, (err) => { if (err) { logger.debug('error:', err); } });
}

export const saveUser = function(user): Promise<UserType> {
  return user.save();
}

export const updateUserService = function(id, data) {
  return user_service.update(id, data, (err) => { if (err) { logger.debug('error:', err); } });
}
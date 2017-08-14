const logger = require('tracer').colorConsole();

import { services } from './test_helpers';
import { BucketData, BucketType, BucketSchema } from '../../server/models/bucket';
import { UserData, UserType, UserSchema, UserModel } from '../../server/models/user';
import { DocumentQuery, Query } from "mongoose";

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

export const saveUser = function(user: UserType): Promise<UserType> {
  return user.save((err) => { if (err) { logger.debug('error:', err); } });
}

export const updateUserService = function(id, data) {
  return UserService.update(id, data, (err) => { if (err) { logger.debug('error:', err); } });
}
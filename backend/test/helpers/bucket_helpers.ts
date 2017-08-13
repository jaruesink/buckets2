const logger = require('tracer').colorConsole();

import { Model, DocumentQuery, Query } from 'mongoose';
import { app, connection, services } from './test_helpers';
import { BucketData, BucketType, BucketSchema } from '../../server/models/bucket';
import { UserType, UserSchema } from '../../server/models/user';
import BucketRepository from '../../server/repositories/bucket_repository';

const BucketModel = connection.model<BucketType>('Bucket', BucketSchema);
const UserModel = connection.model<UserType>('User', UserSchema);
const { bucket: BucketService } = services;

export const createNewBucket = function(data:BucketData): BucketType {
  return new BucketModel(data);
}

export const createBucketService = function(data:BucketData) {
  return BucketService.create(data, (err) => { if (err) { logger.debug('error:', err); } });
}

export const countBuckets = function(query = {}): Query<number> {
  return BucketModel.count(query);
}

export const findAllBuckets = function(ownerID): DocumentQuery<BucketType[], BucketType> {
  return BucketModel.find({ ownerID });
}

export const findBucketsByPages = function(ownerID, pageNumber: number, pageSize: number) {
  return BucketRepository.findBucketsForOwner({ownerID, pageNumber, pageSize});
}

export const findOneBucket = function(_id): DocumentQuery<BucketType, BucketType> {
  return BucketModel.findOne({ _id });
}

export const removeBucketService = function(id) {
  return BucketService.remove(id, (err) => { if (err) { logger.debug('error:', err); } });
}

export const saveBucket = function(bucket): Promise<BucketType> {
  return bucket.save();
}

export const updateBucketService = function(id, data) {
  return BucketService.update(id, data, (err) => { if (err) { logger.debug('error:', err); } });
}
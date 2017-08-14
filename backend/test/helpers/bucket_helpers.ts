const logger = require('tracer').colorConsole();

import { Model, DocumentQuery, Query } from 'mongoose';
import { services } from './test_helpers';
import { BucketData, BucketType, BucketSchema, BucketModel } from '../../server/models/bucket';
import { UserType, UserSchema, UserModel } from '../../server/models/user';
import { BucketRepository } from '../../server/repositories';

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
  return new BucketRepository().findBucketsForOwner({ownerID, pageNumber, pageSize});
}

export const findOneBucket = function(_id): DocumentQuery<BucketType, BucketType> {
  return BucketModel.findOne({ _id });
}

export const removeBucketService = function(id) {
  return BucketService.remove(id, (err) => { if (err) { logger.debug('error:', err); } });
}

export const saveBucket = function(bucket: BucketType): Promise<BucketType> {
  return bucket.save((err) => { if (err) { logger.debug('error:', err); } });
}

export const updateBucketService = function(id, data) {
  return BucketService.update(id, data, (err) => { if (err) { logger.debug('error:', err); } });
}
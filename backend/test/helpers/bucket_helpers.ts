import * as logger from '../../server/logger';
import { Model, DocumentQuery, Query } from 'mongoose';
import { app, connection } from './test_helpers';
import { BucketData, BucketSchema, BucketType } from '../../server/models/bucket';
import { UserSchema, UserType } from '../../server/models/user';

const BucketModel = connection.model<BucketType>('Bucket', BucketSchema);
const UserModel = connection.model<UserType>('User', UserSchema);

const bucket_service = app.service('api/bucket');

export const createNewBucket = function(data:BucketData): BucketType {
  return new BucketModel(data);
}

export const createBucketService = function(data:BucketData) {
  return bucket_service.create(data, (err) => { if (err) { logger.debug('error:', err); } });
}

export const countBuckets = function(query = {}): Query<number> {
  return BucketModel.count(query);
}

export const findAllBuckets = function(user_id): DocumentQuery<BucketType[], BucketType> {
  return BucketModel.find({ ownerID: user_id });
}

export const findOneBucket = function(bucket_id): DocumentQuery<BucketType, BucketType> {
  return BucketModel.findOne({ _id: bucket_id });
}

export const removeBucketService = function(id) {
  return bucket_service.remove(id, (err) => { if (err) { logger.debug('error:', err); } });
}

export const saveBucket = function(bucket): Promise<BucketType> {
  return bucket.save();
}

export const updateBucketService = function(id, data) {
  return bucket_service.update(id, data, (err) => { if (err) { logger.debug('error:', err); } });
}
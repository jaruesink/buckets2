import { request } from 'http';
import logger from '../logger';
import * as errors from 'feathers-errors';
import { BucketModel } from '../models/bucket';

export default class BucketService {
  find({query: {userID, bucketID}}) {
    if (userID) {
      return BucketModel.find({ ownerID: userID })
        .then(returned_buckets => Promise.resolve(returned_buckets));
    }
    if (bucketID) {
      return BucketModel.findOne({ _id: bucketID })
        .then(bucket => Promise.resolve(bucket));
    }
    return Promise.reject(new errors.BadRequest('incorrect bucket query provided'));
  }
  create({
    name,
    amount,
    isFund = false,
    type,
    ownerID
    }) {
    const new_bucket = new BucketModel({ name, amount, type, isFund, ownerID });
    return new_bucket.save((error) => {
      if (error) { return Promise.reject(new errors.BadRequest('invalid create bucket form')); }
      return Promise.resolve(new_bucket);
    });
  }
  remove(_id, params, errorCallback) {
    return BucketModel.findByIdAndRemove({ _id })
      .then(bucket => Promise.resolve(bucket))
      .catch(errorCallback);
  }
  update(_id, data, params, errorCallback) {
    return BucketModel.findByIdAndUpdate({ _id }, data, { new: true })
      .then(bucket => Promise.resolve(bucket))
      .catch(errorCallback);
  }
}

const Bucket = require('../models/bucket');
const User = require('../models/user');
const errors = require('feathers-errors');

class BucketService {
  find({ query: { userID, bucketID } }) {
    if (userID) {
      return User.findOne({ _id: userID }).populate('buckets')
        .then(user => Promise.resolve(user.buckets));
    }
    return Bucket.findOne({ _id: bucketID })
      .then(bucket => Promise.resolve(bucket));
  }
  create({
    name,
    amount,
    isFund = false,
    type,
    ownerID
    }) {
    const new_bucket = new Bucket({ name, amount, type, isFund, ownerID });
    return new_bucket.save((error) => {
      if (error) { return Promise.reject(new errors.BadRequest('invalid create bucket form')); }
      return Promise.resolve(new_bucket);
    });
  }
  remove(_id, params, next) {
    return Bucket.findByIdAndRemove({ _id })
      .then(bucket => Promise.resolve(bucket))
      .catch(next);
  }
  update(_id, data, params, next) {
    return Bucket.findByIdAndUpdate({ _id }, data, { new: true })
      .then(bucket => Promise.resolve(bucket))
      .catch(next);
  }
}

module.exports = BucketService;

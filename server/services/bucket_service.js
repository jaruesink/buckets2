const Bucket = require('../models/bucket');
const User = require('../models/user');
const errors = require('feathers-errors');

class BucketService {
  find({ query: { userID: _id } }) {
    return User.findOne({ _id }).populate('buckets')
      .then(user => Promise.resolve(user.buckets));
  }
  create({
    amount,
    isFund = false,
    name,
    type,
    userID: _id
    }) {
    const new_bucket = new Bucket({ name, amount, type, isFund });
    return new_bucket.save((error) => {
      if (error) {
        return Promise.reject(
          new errors.BadRequest('invalid create bucket form')
        );
      }
      return User.findOneAndUpdate({ _id }, { $push: { buckets: new_bucket } })
        .then(() => Promise.resolve(new_bucket));
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

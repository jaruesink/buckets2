const Bucket = require('../models/bucket');
const User = require('../models/user');

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
    }, params, next) {
    const bucket_data = new Bucket({ name, amount, type, isFund });
    return User.findOneAndUpdate({ _id }, { $push: { buckets: bucket_data } })
      .then(() => bucket_data.save(bucket_data)
        .then(bucket => Promise.resolve(bucket))
        .catch(next)
    );
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

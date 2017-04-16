const Bucket = require('../models/bucket');

class BucketService {
  find(params) {
    console.log(params);
    return Promise.resolve(params);
  }
  create(data, params, next) {
    return Bucket.create(data)
      .then(bucket => Promise.resolve(bucket))
      .catch(next);
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

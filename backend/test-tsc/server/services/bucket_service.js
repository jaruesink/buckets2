const Bucket = require('../models/bucket');
const User = require('../models/user');
const errors = require('feathers-errors');
const logger = require('../logger');
class BucketService {
    find({ query: { userID, bucketID } }) {
        if (userID) {
            return Bucket.find({ ownerID: userID })
                .then(returned_buckets => Promise.resolve(returned_buckets));
        }
        if (bucketID) {
            return Bucket.findOne({ _id: bucketID })
                .then(bucket => Promise.resolve(bucket));
        }
        return Promise.reject(new errors.BadRequest('incorrect bucket query provided'));
    }
    create({ name, amount, isFund = false, type, ownerID }) {
        logger.info(`creating bucket ${name}`);
        const new_bucket = new Bucket({ name, amount, type, isFund, ownerID });
        return new_bucket.save((error) => {
            if (error) {
                return Promise.reject(new errors.BadRequest('invalid create bucket form'));
            }
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
//# sourceMappingURL=bucket_service.js.map
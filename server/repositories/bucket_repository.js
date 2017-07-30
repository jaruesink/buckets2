const Bucket = require('../models/bucket');
const Promise = require('bluebird');
const logger = require('../logger');
const PageUtils = require('../utils/page_utils');

class BucketRepository {
  findBucketsByUserId({ ownerID, pageNumber, pageSize }) {
    const query = Bucket.find({ ownerID })
      .sort({ name: -1 });
    const resultsPromise = query
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize).then(results => Promise.resolve(results));
    const countPromise = query.count().then(count => Promise.resolve(count));

    return Promise.props({ results: resultsPromise, count: countPromise })
      .then(({ results, count }) =>
        Promise.resolve(
          PageUtils.of({
            data: results,
            pageNumber,
            pageSize,
            totalRecords: count
          })
        )
      );
  }
}

module.exports = new BucketRepository();

const Bucket = require('../models/bucket');
const Promise = require('bluebird');
const logger = require('../logger');
class PageDef {
  of({ data, pageNumber, pageSize, totalRecords }) {
    return { data, pageNumber, pageSize, totalRecords };
  }
}

const Page = new PageDef();

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
          Page.of({
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

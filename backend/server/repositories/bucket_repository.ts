const logger = require('tracer').colorConsole();
import { BucketModel } from '../models/bucket';
import * as Promise from 'bluebird';
import PageUtils from '../utils/page_utils'

export class BucketRepository {
  findBucketsForOwner({ ownerID, pageNumber, pageSize }) {
    const query = BucketModel.find({ ownerID })
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
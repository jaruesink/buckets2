import * as mongoose from 'mongoose';

import * as server from '../server';
import * as logger from '../server/logger';

import { suite } from 'mocha-typescript';

const { buckets, users } = mongoose.connection.collections;

function dropBuckets(done:any) {
  return Promise.all([
    buckets.drop(),
    users.drop(),
  ]).then(() => done())
  .catch(error => {
    console.error(error);
    done()
  });
}

@suite
export default class Suite {
  before(done:any) {
    logger.debug('Truncating test database');
    dropBuckets(done);
  }
  static after(done:any) {
    dropBuckets(done);
  }
}
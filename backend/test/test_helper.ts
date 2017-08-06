import * as mongoose from 'mongoose';

import * as server from '../server';
import * as logger from '../server/logger';

import { suite } from 'mocha-typescript';

const { buckets, users } = mongoose.connection.collections;


function dropBuckets(done:any) {
  const collections = mongoose.connection.collections;
  const collections_to_drop = [];
  for (const collection in mongoose.connection.collections) {
    collections_to_drop.push(collections[collection].drop());
  }
  return Promise.all([...collections_to_drop]).then(() => done())
  .catch(error => {
    console.error(error);
    done()
  });
}

@suite
export default class Suite {
  before(done:any) {
    logger.debug('reset test database before each test');
    dropBuckets(done);
  }
  static after(done:any) {
    logger.debug('reset test database after all tests');
    dropBuckets(done);
  }
}
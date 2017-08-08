import * as db from 'mongoose';
(<any>db).Promise = global.Promise;

import * as config from 'config';
import * as feathers from 'feathers/client';
import * as rest from 'feathers-rest/client';
import * as fetch from 'node-fetch';

import * as logger from '../server/logger';

import { suite } from 'mocha-typescript';

const db_connection_url = config.get('buckets.db.url');

function dropCollections(connection):Promise<any> {
  const collections = connection.collections;
  const collections_to_drop = [];
  for (const collection in collections) {
    collections_to_drop.push(collections[collection].drop());
  }
  return Promise.all(collections_to_drop).catch((error) => {
    if (error) { logger.debug('error dropping collections', error) }
  });
}

@suite export default class TestHelper {
  app:any = feathers().configure(rest('http://localhost:3000').fetch(fetch));
  connection = db.createConnection(db_connection_url);
  before() {
    dropCollections(this.connection);
  }
  // QUESTION: Why is this different in the static after() than in the before()
  // do we even need an after all tests 
  static after() {
    // dropCollections(this.connection).then(() => db.connection.close());
    db.connection.close();
  }
}

import * as db from 'mongoose';
(<any>db).Promise = global.Promise;

import * as config from 'config';
import * as feathers from 'feathers/client';
import * as rest from 'feathers-rest/client';
import * as fetch from 'node-fetch';

import * as logger from '../server/logger';

import { suite } from 'mocha-typescript';

const db_connection_url = config.get('buckets.db.url');

async function dropCollections() {
  const collections = db.connection.collections;
  const collections_to_drop = [];
  for (const collection in collections) {
    collections_to_drop.push(collections[collection].drop());
  }
  await Promise.all(collections_to_drop).catch((error) => {
      if (error && error.message !== 'ns not found') {
        // TODO: Get rid of the 'ns not found' error
        logger.debug('error dropping collections', error);
      } else {
        return false;
      }
    });
}

@suite export default class Suite {
  app:any = feathers().configure(rest('http://localhost:3000').fetch(fetch));
  connection = db.createConnection(db_connection_url);
  before() {
    dropCollections();
  }
  static after() {
    dropCollections().then(() => db.connection.close());
  }
}

import * as db from 'mongoose';
(<any>db).Promise = global.Promise;

import * as config from 'config';
import * as feathers from 'feathers/client';
import * as rest from 'feathers-rest/client';
import * as fetch from 'node-fetch';

import * as logger from '../server/logger';

import { suite } from 'mocha-typescript';

const db_connection_url = config.get('buckets.db.url');

@suite export default class TestHelper {
  app:any = feathers().configure(rest('http://localhost:3000').fetch(fetch));
  connection = db.createConnection(db_connection_url);
  before() {
    db.connection.dropDatabase().catch(error => {
      if (error) { logger.debug('error dropping database', error); }
    });
  }
  // QUESTION: Why is this different in the static after() than in the before()
  static after() {
    db.connection.dropDatabase().then(() => db.connection.close()).catch(error => {
      if (error) { logger.debug('error dropping database', error); }
    });
  }
}

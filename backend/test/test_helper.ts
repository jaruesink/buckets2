import * as m from 'mongoose';
(<any>m).Promise = global.Promise;

import * as config from 'config';
import * as feathers from 'feathers/client';
import * as rest from 'feathers-rest/client';
import * as fetch from 'node-fetch';

import * as logger from '../server/logger';

import { suite } from 'mocha-typescript';

const db_connection_url = config.get('buckets.db.url');
const connection = m.createConnection(db_connection_url);

@suite export default class TestHelper {
  app:any = feathers().configure(rest('http://localhost:3000').fetch(fetch));
  connection = connection;
  before() {
    connection.dropDatabase().catch(error => {
      if (error) { logger.debug('error dropping database', error); }
    });
  }
  static after() {
    connection.dropDatabase().then(() => m.connection.close()).catch(error => {
      if (error) { logger.debug('error dropping database', error); }
    });
  }
}

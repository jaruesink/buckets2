const logger = require('tracer').colorConsole();

import * as m from 'mongoose';
(<any>m).Promise = global.Promise;

import * as config from 'config';
import * as feathers from 'feathers/client';
import * as rest from 'feathers-rest/client';
import * as fetch from 'node-fetch';

import { suite } from 'mocha-typescript';

const db_connection_url = config.get('buckets.db.url');
export const connection = m.createConnection(db_connection_url);
export const app:any = feathers().configure(rest('http://localhost:3000').fetch(fetch));

@suite export class TestHelper {
  before() {
    connection.dropDatabase().catch(error => {
      if (error) { logger.debug('error dropping database', error); }
    });
  }
  static after() {
    connection.dropDatabase().catch(error => {
      if (error) { logger.debug('error dropping database', error); }
    });
  }
}

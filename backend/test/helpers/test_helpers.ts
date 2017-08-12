const logger = require('tracer').colorConsole();

import * as m from 'mongoose';
(<any>m).Promise = global.Promise;

import * as config from 'config';
import * as feathers from 'feathers/client';
import * as rest from 'feathers-rest/client';
import * as fetch from 'node-fetch';

import { suite } from 'mocha-typescript';

import Server from '../../server/server';

const bucketsDbUrl = config.get('buckets.db.url');
const options = config.get('buckets.db.options');

export const connection = Server.createConnection(bucketsDbUrl, options);
export const app = Server.app;
// export const app:any = feathers().configure(rest('http://localhost:3000').fetch(fetch));

@suite export class TestHelper {
  static before() {
    Server.run();
  }
  before() {
    connection.dropDatabase().catch(error => {
      if (error) { logger.debug('error dropping database', error); }
    });
  }
  static after() {
    connection.dropDatabase().catch(error => {
      if (error) { logger.debug('error dropping database', error); }
    });
    Server.close();
  }
}

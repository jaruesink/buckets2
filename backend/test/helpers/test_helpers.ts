import logger from '../../server/logger';

import * as m from 'mongoose';
(<any>m).Promise = global.Promise;

import * as config from 'config';
import * as feathers from 'feathers/client';
import * as rest from 'feathers-rest/client';
import * as fetch from 'node-fetch';

import { suite } from 'mocha-typescript';

import { Server } from '../../server/server';
const server = new Server();

const bucketsDbUrl = config.get('buckets.db.url');
const options = config.get('buckets.db.options');

const connection = server.createConnection(bucketsDbUrl, options);
m.connect(bucketsDbUrl, options);


const fetcher = feathers();
fetcher.configure(rest('http://localhost:3000').fetch(fetch));
export const services = {
  bucket: fetcher.service('api/bucket'),
  login: fetcher.service('api/login'),
  user: fetcher.service('api/user')
};


@suite export class TestHelper {
  static before() {
    server.run();
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
    server.close();
  }
}

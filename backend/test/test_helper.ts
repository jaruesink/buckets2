import * as db from 'mongoose';

import * as server from '../server';
import * as logger from '../server/logger';

import { suite } from 'mocha-typescript';

const { users } = db.connection.collections;

async function dropCollections() {
  const collections = db.connection.collections;
  const collections_to_drop = [];
  for (const collection in collections) {
    collections_to_drop.push(collections[collection].drop());
  }
  await Promise.all([users.drop()]).catch((error) => {
      if (error && error.message !== 'ns not found') {
        logger.debug('error dropping collections', error);
      } else {
        return false;
      }
    });
}

@suite export default class Suite {
  before() {
    dropCollections();
  }
  static after() {
    dropCollections();
  }
}
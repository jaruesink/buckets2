import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';

import * as feathers from 'feathers/client';
import * as rest from 'feathers-rest/client';
import * as fetch from 'node-fetch';

import TestHelper from './test_helper';

const app:any = feathers().configure(rest('http://localhost:3000').fetch(fetch));
const user_service = app.service('api/user');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Bucket = require('../../server/models/bucket');
const User = require('../../server/models/user');

interface UserData {
  fbid: number;
  name: string;
  email: string;
}

@suite('Users') class UserTest extends TestHelper {

  user_data: UserData = {
    fbid: 1234567890,
    name: 'Test User',
    email: 'test@email.com'
  }

  async countUsers():Promise<any> {
    await User.count({});
  }

  async createUser(data:UserData):Promise<any> {
    await user_service.create(data,
      (err) => { if (err) { console.error(err); } }
    );
  }

  @test 'can be created'() {
    this.countUsers().then((count) => {
      this.createUser(this.user_data)
        .then((new_user) => {
          this.countUsers().then((new_count) => {
            assert(count + 1 === new_count);
          });
      });
    });
  }
}

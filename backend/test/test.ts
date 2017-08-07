const mongoose = require('mongoose');
mongoose.Promise = Promise;

import * as feathers from 'feathers/client';
import * as rest from 'feathers-rest/client';
import * as fetch from 'node-fetch';

import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import { UserData, UserModel, UserSchema } from '../server/models/user';

import TestHelper from './test_helper';

const app:any = feathers().configure(rest('http://localhost:3000').fetch(fetch));
const user_service = app.service('api/user');


@suite('Users') class UserTest extends TestHelper {
  @test 'can be created'(done) {

    // NO HACIENDO
    console.log('User is a model', UserModel);
    UserModel.count({}).then((count) => {
      user_service.create({
        fbid: 1234567890,
        name: 'Test User',
        email: 'test@email.com'
      }, (err) => { if (err) { console.error(err); } })
      .then((new_user) => {
        UserModel.count({}).then((new_count) => {
          console.log(count, new_count);
          assert(count + 1 === new_count);
          done();
        });
      });
    });
  }
}

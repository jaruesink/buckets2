import * as config from 'config';
import * as logger from '../server/logger';


import * as db from 'mongoose';
(<any>db).Promise = global.Promise;

import * as feathers from 'feathers/client';
import * as rest from 'feathers-rest/client';
import * as fetch from 'node-fetch';

import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import { UserData, UserModel, UserSchema, UserType } from '../server/models/user';

import TestHelper from './test_helper';

const app:any = feathers().configure(rest('http://localhost:3000').fetch(fetch));
const user_service = app.service('api/user');

const db_connection_options = config.get('buckets.db.options');
const db_connection_url = config.get('buckets.db.url');

db.connect(db_connection_url, db_connection_options, (error) => {
  if (error) { logger.debug('error with connection', error); }
}).then(() => {
  logger.debug('connected to:', db_connection_url);
});


@suite('Users') class UserTest extends TestHelper {

  userData: UserData = {
    fbid: 1234567890,
    name: 'Test User',
    email: 'test@email.com'
  }

  createNewUser(data): UserType {
    return new UserModel(data);
  }

  createUserService(data) {
    return user_service.create(data, (err) => { if (err) { console.error(err); } });
  }

  findOneUser(id) {
    return UserModel.findOne({ _id: id });
  }

  removeUserService(id) {
    return user_service.remove(id, (err) => { if (err) { console.error(err); } });
  }

  saveUser(user): Promise<UserType> {
    return user.save();
  }

  updateUserService(id, data) {
    return user_service.update(id, data, (err) => { if (err) { console.error(err); } });
  }

  userCount() {
    return UserModel.count({});
  }

  @test async 'can be created'() {
    await this.userCount().then(count => 
      this.createUserService(this.userData).then((new_user) =>
        this.userCount().then((new_count) => {
          logger.debug(`(count + 1 === new_count) ${count} + 1 === ${new_count}`);
          assert(count + 1 === new_count);
        })
      )
    )
  }

  @test async 'can be edited'() {
    const new_user = this.createNewUser(this.userData);
    const new_name = 'Joe Tester';
    await this.saveUser(new_user).then(() =>
      this.updateUserService(new_user._id, {name: new_name}).then(edited_user =>
        this.findOneUser(new_user._id).then(found_user => {
          logger.debug(`(found_user.name === new_name) ${found_user.name} === ${new_name}`);
          assert(found_user.name === new_name);
        })
      )
    )
  }

  @test async 'can be deleted'() {
    const new_user = this.createNewUser(this.userData);
    await this.saveUser(new_user).then(() =>
      this.removeUserService(new_user._id).then(() => 
        this.findOneUser(new_user._id).then(found_user => {
          logger.debug(`(found_user === null) ${found_user} === null`);
          assert(found_user === null);
        })
      )
    );
  }

  //   it('can be deleted', (done) => {
  //   const user = new User({
  //     fbid: 1234567890,
  //     name: 'Test User',
  //     email: 'test@email.com'
  //   });

  //   user.save().then(() => {
  //     user_service.remove(user._id, err => console.error(err))
  //       .then((removed_user) => {
  //         User.findOne({ _id: user._id })
  //           .then((found_user) => {
  //             assert(found_user === null);
  //             done();
  //           });
  //       });
  //   });
  // });

}

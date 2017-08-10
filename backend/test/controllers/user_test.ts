import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import { UserData, UserSchema, UserType } from '../../server/models/user';
import { BucketData, BucketSchema, BucketType } from '../../server/models/bucket';

import * as logger from '../../server/logger';

import {
  TestHelper,
  countUsers,
  createNewBucket,
  createNewUser,
  createUserService,
  findAllBuckets,
  findOneUser,
  removeUserService,
  saveBucket,
  saveUser,
  updateUserService
} from '../helpers';

@suite('Users') export default class UserTest extends TestHelper {

  private testUserData: UserData = {
    fbid: 1234567890,
    name: 'Test User',
    email: 'test@email.com'
  }

  private testBucketData(id): BucketData {
    return {
      name: 'Test Bucket',
      type: 'budget',
      amount: 500,
      ownerID: id
    }
  }

  @test async 'can be created'() {
    await countUsers().then(count => 
      createUserService(this.testUserData).then((new_user) =>
        countUsers().then((new_count) => {
          logger.debug(`(count + 1 === new_count) ${count} + 1 === ${new_count}`);
          assert(count + 1 === new_count);
        })
      )
    )
  }

  @test async 'can be edited'() {
    const new_user = createNewUser(this.testUserData);
    const new_name = 'Joe Tester';
    await saveUser(new_user).then(() =>
      updateUserService(new_user._id, {name: new_name}).then(edited_user =>
        findOneUser(new_user._id).then(found_user => {
          logger.debug(`(found_user.name === new_name) ${found_user.name} === ${new_name}`);
          assert(found_user.name === new_name);
        })
      )
    )
  }

  @test async 'can be deleted'() {
    const new_user = createNewUser(this.testUserData);
    await saveUser(new_user).then(() =>
      removeUserService(new_user._id).then(() => 
        findOneUser(new_user._id).then(found_user => {
          logger.debug(`(found_user === null) ${found_user} === null`);
          assert(found_user === null);
        })
      )
    );
  }

  @test async 'can retrieve buckets they own'() {
    const new_user = createNewUser(this.testUserData)
    const new_bucket = createNewBucket(this.testBucketData(new_user._id));
    await saveUser(new_user).then(saved_user => 
      saveBucket(new_bucket).then(saved_bucket => 
        findAllBuckets(saved_user._id).then(returned_buckets => {
          logger.debug(`(saved_bucket._id.toString() === returned_buckets[0]._id.toString()) ${saved_bucket._id.toString()} === ${returned_buckets[0]._id.toString()}`);
          assert(saved_bucket._id.toString() === returned_buckets[0]._id.toString());
        })
      )
    )
  }

}

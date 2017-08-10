import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import { UserData, UserSchema, UserType } from '../../server/models/user';
import { BucketData, BucketSchema, BucketType } from '../../server/models/bucket';

import * as logger from '../../server/logger';

import  TestHelper from '../test_helper';

@suite('Users') export default class UserTest extends TestHelper {

  testUserData: UserData = {
    fbid: 1234567890,
    name: 'Test User',
    email: 'test@email.com'
  }

  testBucketData(id): BucketData {
    return {
      name: 'Test Bucket',
      type: 'budget',
      amount: 500,
      ownerID: id
    }
  }

  BucketModel = this.connection.model<BucketType>('Bucket',BucketSchema);

  UserModel = this.connection.model<UserType>('User', UserSchema);

  user_service = this.app.service('api/user');

  createNewBucket(data): BucketType {
    return new this.BucketModel(data);
  }

  createNewUser(data): UserType {
    return new this.UserModel(data);
  }

  createUserService(data) {
    return this.user_service.create(data, (err) => { if (err) { console.error(err); } });
  }

  findAllBuckets(user_id) {
    return this.BucketModel.find({ ownerID: user_id })
  }

  findOneUser(user_id) {
    return this.UserModel.findOne({ _id: user_id });
  }

  removeUserService(id) {
    return this.user_service.remove(id, (err) => { if (err) { console.error(err); } });
  }

  saveBucket(bucket): Promise<BucketType> {
    return bucket.save();
  }

  saveUser(user): Promise<UserType> {
    return user.save();
  }

  updateUserService(id, data) {
    return this.user_service.update(id, data, (err) => { if (err) { console.error(err); } });
  }

  userCount() {
    return this.UserModel.count({});
  }

  @test async 'can be created'() {
    await this.userCount().then(count => 
      this.createUserService(this.testUserData).then((new_user) =>
        this.userCount().then((new_count) => {
          logger.debug(`(count + 1 === new_count) ${count} + 1 === ${new_count}`);
          assert(count + 1 === new_count);
        })
      )
    )
  }

  @test async 'can be edited'() {
    const new_user = this.createNewUser(this.testUserData);
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
    const new_user = this.createNewUser(this.testUserData);
    await this.saveUser(new_user).then(() =>
      this.removeUserService(new_user._id).then(() => 
        this.findOneUser(new_user._id).then(found_user => {
          logger.debug(`(found_user === null) ${found_user} === null`);
          assert(found_user === null);
        })
      )
    );
  }

  @test async 'can retrieve buckets they own'() {
    const new_user = this.createNewUser(this.testUserData)
    const new_bucket = this.createNewBucket(this.testBucketData(new_user._id));
    await this.saveUser(new_user).then(saved_user => 
      this.saveBucket(new_bucket).then(saved_bucket => 
        this.findAllBuckets(saved_user._id).then(returned_buckets => {
          logger.debug(`(saved_bucket._id.toString() === returned_buckets[0]._id.toString()) ${saved_bucket._id.toString()} === ${returned_buckets[0]._id.toString()}`);
          assert(saved_bucket._id.toString() === returned_buckets[0]._id.toString());
        })
      )
    )
  }

}

import * as logger from '../../server/logger';
import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import { UserData, UserSchema, UserType } from '../../server/models/user';
import { BucketData, BucketSchema, BucketType } from '../../server/models/bucket';

import {
  countBuckets,
  createBucketService,
  createNewBucket,
  createNewUser,
  saveBucket,
  saveUser,
  TestHelper,
  updateBucketService,
  findOneBucket,
  removeBucketService
} from '../helpers';

@suite('Buckets') export default class BucketTest extends TestHelper {

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
    const new_user = createNewUser(this.testUserData);
    const new_bucket = createNewBucket(this.testBucketData(new_user._id));

    await saveUser(new_user).then(saved_user => 
      countBuckets({ownerID: new_user._id}).then(count =>
        createBucketService(new_bucket).then(created_bucket =>
          countBuckets({ownerID: saved_user._id}).then(new_count => {
            logger.debug(
              '(count + 1 === new_count)',
              `${count} + 1 === ${new_count}`
            );
            assert(count + 1 === new_count);
          })
        )
      )
    )
  }

  @test async 'can be edited'() {
    const new_user = createNewUser(this.testUserData);
    const new_bucket = createNewBucket(this.testBucketData(new_user._id));

    await saveUser(new_user).then(saved_user => 
      saveBucket(new_bucket).then(saved_bucket =>
        updateBucketService(saved_bucket._id, {amount: new_bucket.amount + 10}).then(edited_bucket =>
          findOneBucket(new_bucket._id).then(found_bucket => {
            logger.debug(
              '(found_bucket.amount === new_bucket.amount + 10)',
              `${found_bucket.amount} === ${new_bucket.amount + 10}`
            );
            assert(found_bucket.amount === new_bucket.amount + 10);
          })
        )
      )
    )
  }

  @test async 'can be deleted'() {
    const new_user = createNewUser(this.testUserData);
    const new_bucket = createNewBucket(this.testBucketData(new_user._id));

    await saveUser(new_user).then(saved_user =>
      saveBucket(new_bucket).then(saved_bucket =>
        removeBucketService(new_bucket._id).then(removed_bucket => 
          findOneBucket(saved_bucket._id).then(found_bucket => {
            logger.debug(
              '(found_bucket === null)',
              `${found_bucket} === null`
            );
            assert(found_bucket === null);
          })
        )
      )
    )
  }

}


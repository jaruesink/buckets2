import { suite, test } from 'mocha-typescript';
import { assert } from 'chai';
import * as feathers from 'feathers/client';
import * as rest from 'feathers-rest/client';
import * as fetch from 'node-fetch';
import * as mongoose from 'mongoose'

import TestHelper from './test_helper';

const User = require('../server/models/user');
const Bucket = require('../server/models/bucket');

const app:any = feathers().configure(rest('http://localhost:3000').fetch(fetch));
const user_service = app.service('api/user');

interface UserData {
  fbid: number;
  name: string;
  email: string;
}

@suite('Users') class UserTest extends TestHelper {
  
  user_data: {
    fbid: 1234567890,
    name: 'Test User',
    email: 'test@email.com'
  }
  
  async count_users():Promise<any> { await User.count({}) }
  
  async create_user(user_data:UserData):Promise<void> {
    await user_service.create(user_data,
      (err:any) => { if (err) { console.error(err); } }
    ).save();
  }
  
  @test('can be created') userCreatedTest() {
    User.count({}).then((count:number) => {console.log('????', count)});
    // this.count_users().then(count => {
      // console.log('count', count);
      // }).catch(err => console.log('err', err))
      // assert(false);
      // await this.count_users().then(initial_count => {
        // this.create_user(this.user_data).then(created_user => {
          // this.count_users().then(second_count => {
            // // assert(second_count = initial_count++);
            // })
            // })
            // });
          }
          
        }
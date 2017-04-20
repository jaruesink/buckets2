import { Injectable } from '@angular/core';
import { ConnectService } from '../connect/connect.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class BucketService {

  service = this.connect.service('bucket');

  constructor( private auth: AuthService, private connect: ConnectService ) {

    this.service.on('created', (response) => {
      console.log('response from bucket created event', response);
    });

  }
  createBucket(data) {
    // data.userID = this.auth.me._id;
    return this.service.create(data);
  }
  loadBuckets() {
    return this.service.find({query: {}})
  }
  // loadBuckets() {
  //   return this.connect.auth$.flatMap(user => {
  //     if (user) {
  //       return this.service.find({ query: { userID: user._id } });
  //     }
  //     return console.error('user not defined');
  //   })
  // }
}

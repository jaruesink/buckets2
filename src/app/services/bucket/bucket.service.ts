import { Injectable } from '@angular/core';
import { ConnectService } from '../connect/connect.service';

@Injectable()
export class BucketService {

  service = this.connect.service('bucket');
  constructor( private connect: ConnectService ) {
    this.service.on('created', (response) => {
      console.log('response from bucket created event', response);
    });
  }
  createBucket(data) {
    return this.service.create(data);
  }
  loadBuckets(user) {
    console.log(user);
    return this.service.find({ query: user });
  }
}

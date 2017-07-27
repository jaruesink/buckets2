import { Injectable } from '@angular/core';
import { ConnectService } from '../connect/connect.service';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class BucketService {

  service = this.connect.service('bucket');
  buckets: any;
  bucket: any;

  constructor( private auth: AuthService, private connect: ConnectService ) {

    this.service.on('created', (response) => {
      console.log('response from bucket created event', response);
    });

  }

  createBucket(data) {
    data.userID = this.auth.me._id;
    return this.service.create(data);
  }
  
  deleteBucket(id) {
    return this.service.remove(id);
  }

  loadBucket(id) {
    return this.service.find({ query: { bucketID: id } }).then(
      bucket => this.bucket = bucket
    );
  }

  loadBuckets() {
    return this.auth.checkLogin().flatMap(
      (user) => this.service.find({ query: { userID: user._id } }).then(
        buckets => this.buckets = buckets
      ));
  }
}

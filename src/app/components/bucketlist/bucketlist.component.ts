import { Component, OnInit } from '@angular/core';
import { AuthService, BucketService } from '../../services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bucketlist',
  templateUrl: './bucketlist.component.html',
  styleUrls: ['./bucketlist.component.scss']
})
export class BucketlistComponent {
  buckets$: Observable<any> = this.bucketService.loadBuckets();
  constructor(
    public bucketService: BucketService
  ) {
    this.buckets$.subscribe(buckets => console.log('buckets loaded:', buckets));
  }

}

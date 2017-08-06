import { Component, OnInit } from '@angular/core';
import { AuthService, BucketService, ConnectService } from '../../services';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bucketlist',
  templateUrl: './bucketlist.component.html',
  styleUrls: ['./bucketlist.component.scss']
})
export class BucketlistComponent implements OnInit {
  buckets$: Observable<any> = this.bucketService.loadBuckets();
  constructor(
    public bucketService: BucketService, public connect: ConnectService
  ) {}
  ngOnInit() {
    this.buckets$.subscribe(buckets => {
      this.connect.isLoading = false;
      console.log('buckets loaded:', buckets);
    });
  }

}

import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components';
import { BucketService, ConnectService } from '../../services';

@Component({
  selector: 'bucket-page',
  templateUrl: 'bucket.page.html',
  styleUrls: ['./bucket.page.scss']
})
export class BucketPage {
  title = 'Bucket';
  bucket:any = {};
  constructor(
    public bucketService: BucketService,
    public connectService: ConnectService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(({id}) => {
      console.log(id);
      this.bucketService.loadBucket(id).then(bucket => {
        this.bucket = bucket;
        this.connectService.isLoading = false;
      });
    });
  }
  ngOnDestroy() {
    this.bucketService.bucket = null;
  }
  deleteBucket(id) {
    this.bucketService.deleteBucket(id).then(() => {
      this.router.navigate(['/']);
    });
  }
}

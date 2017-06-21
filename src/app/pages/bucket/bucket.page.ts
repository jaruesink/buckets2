import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../components';
import { BucketService } from '../../services';

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
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(({id}) => {
      this.bucketService.loadBucket(id);
    });
  }
  ngOnDestroy() {
    this.bucketService.bucket = null;
  }
}

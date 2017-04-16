import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components';
import { BucketService } from '../../services';

@Component({
  selector: 'addbucket-page',
  templateUrl: 'addbucket.page.html',
  styleUrls: ['./addbucket.page.scss']
})
export class AddbucketPage {
  title = 'Create Bucket';
  bucket:any = {};
  constructor(
    private bucketService: BucketService,
    public router: Router
  ) { }
  addBucketFormSubmit(form) {
    this.bucketService.createBucket(form.value)
      .then((bucket) => {
        console.log('bucket was created', bucket);
        this.router.navigate(['/']);
      }).catch((err) => console.error(err));
  }
}

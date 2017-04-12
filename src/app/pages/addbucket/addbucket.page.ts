import { Component } from '@angular/core';
import { HeaderComponent } from '../../components';

@Component({
  selector: 'addbucket-page',
  template: `
  <header [title]="title"></header>
  `,
  styleUrls: ['./addbucket.page.scss']
})
export class AddbucketPage {
  title = 'Create Bucket';
}

import { Component } from '@angular/core';
import { HeaderComponent } from '../../components';

@Component({
  selector: 'home-page',
  template: `
  <header [title]="title"></header>
  <main class="padding_2">
    <bucketlist></bucketlist>
    <button routerLink="/addbucket">Add Bucket</button>
  </main>
  `,
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  title = 'Home';
}

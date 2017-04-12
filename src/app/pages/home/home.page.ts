import { Component } from '@angular/core';
import { HeaderComponent } from '../../components';

@Component({
  selector: 'home-page',
  template: `
  <header [title]="title"></header>
  `,
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  title = 'Home';
}

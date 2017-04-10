import { Component } from '@angular/core';
import { HeaderComponent } from '../../components';

@Component({
  selector: 'home-page',
  template: `
  <header></header>
  <h1>{{title}}</h1>
  `,
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  title = 'Home Page!';
}

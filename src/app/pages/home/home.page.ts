import { Component } from '@angular/core';

@Component({
  selector: 'home-page',
  template: `
  <h1>{{title}}</h1>
  `,
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  title = 'Home Page!';
}

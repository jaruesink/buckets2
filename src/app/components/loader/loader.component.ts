import { Component } from '@angular/core';

@Component({
  selector: 'loader',
  template:  `
    <ul class="loader">
      <li></li>
      <li></li>
      <li></li>
    </ul>`,
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  constructor() { }

}

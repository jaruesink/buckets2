import { Component } from '@angular/core';
import { FacebookService, InitParams } from 'ng2-facebook-sdk';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private fb: FacebookService,
  ) {
    const FBParams: InitParams = {
      appId: '228671707475003',
      xfbml: true,
      version: 'v2.8',
      cookie: true
    };
    fb.init(FBParams);
  }
}

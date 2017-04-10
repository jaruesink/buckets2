import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService, InitParams } from 'ng2-facebook-sdk';
import { AuthService } from './services';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private fb: FacebookService,
    private router: Router
  ) {
    const FBParams: InitParams = {
      appId: '228671707475003',
      xfbml: true,
      version: 'v2.8',
      cookie: true
    };
    fb.init(FBParams);

    this.auth.checkLogin().then(() => {
      console.log('already logged in');
      this.router.navigate(['/']);
      this.auth.currentAuth().then(user => console.log(user));
    }).catch(() => {
      console.log('user is not logged in');
      this.router.navigate(['/login']);
    });
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService, InitParams } from 'ng2-facebook-sdk';
import { AuthService, ConnectService } from './services';
import { LoaderComponent } from './components';

@Component({
  selector: 'app-root',
  template: `
  <main>
    <loader *ngIf="isLoading"></loader>
    <router-outlet [ngClass]="{'loading': isLoading}"></router-outlet>
  </main>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    private connect: ConnectService,
    private fb: FacebookService,
    private router: Router
  ) {
    this.connect.isLoading = true;
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
      this.auth.currentAuth().then(user => {
        console.log(user);
        this.auth.me = user;
        this.connect.isLoading = false;
      });
    }).catch(() => {
      console.log('user is not logged in');
      this.router.navigate(['/login']).then(() => {
        this.connect.isLoading = false;
      });
    });
  }
}

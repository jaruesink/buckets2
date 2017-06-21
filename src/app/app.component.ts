import { Component } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { FacebookService, InitParams } from 'ngx-facebook';
import { AuthService, ConnectService } from './services';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `
  <main>
    <md-progress-bar mode="indeterminate" *ngIf="connect.isLoading"></md-progress-bar>
    <router-outlet [ngClass]="{'loading': connect.isLoading}"></router-outlet>
  </main>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private auth: AuthService,
    public connect: ConnectService,
    private fb: FacebookService,
    private router: Router
  ) {

    this.connect.isLoading = true;

    const FBParams: InitParams = {
      appId: environment.fbAppID,
      xfbml: true,
      version: 'v2.8',
      cookie: true
    };

    fb.init(FBParams);

    this.auth.checkLogin().subscribe(
      (user) => {
        // console.log('user info: ', user)
        if (!this.auth.me) { this.auth.me = user; }
      });

    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart ) {
        if (this.connect.current_path) {
          this.connect.previous_path = this.connect.current_path;
          console.log('previous_path:', this.connect.previous_path);
        }
        this.connect.current_path = event.url;
        console.log('current_path:', event.url);
      }
    });

  }

}

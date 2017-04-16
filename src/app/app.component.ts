import { Component } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { FacebookService, InitParams } from 'ng2-facebook-sdk';
import { AuthService, ConnectService } from './services';
import { LoaderComponent } from './components';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `
  <main>
    <loader *ngIf="connect.isLoading"></loader>
    <router-outlet [ngClass]="{'loading': connect.isLoading}"></router-outlet>
  </main>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authChecked: boolean = false;
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
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd ) {
         if (this.connect.current_path) {
           this.connect.previous_path = this.connect.current_path;
           console.log('previous_path:', this.connect.previous_path);
         }
        this.connect.current_path = event.url;
        console.log('current_path:', event.url);
        if (!this.authChecked) {
          this.auth.checkAuth(event.url).then(() => this.authChecked = true);
        }
      }
    });
  }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService, LoginResponse } from 'ng2-facebook-sdk';
import { ConnectService } from '../connect/connect.service';

@Injectable()
export class AuthService {

  me: any;

  constructor(
    public router: Router,
    private fb: FacebookService,
    private connect: ConnectService
  ) { }

  currentAuth() {
    const access_token = this.fb.getAuthResponse().accessToken;
    return this.connect.loginService(access_token);
  }

  checkLogin() {
    return new Promise((resolve, reject) => {
      this.fb.getLoginStatus().then(response => {
        if (response.status === 'connected') {
          resolve();
        }
        reject();
      });
    });
  }

  checkAuth(current_path) {
    return this.checkLogin().then(() => {
      console.log('already logged in');
      if (current_path === '/login') {
        this.router.navigate(['/']);
      }
      this.currentAuth().then(user => {
        console.log(user);
        this.me = user;
        this.connect.isLoading = false;
      });
    }).catch((error) => {
      console.log('user is not logged in', error);
      this.router.navigate(['/login']).then(() => {
        this.connect.isLoading = false;
      });
    });
  }

  login() {
    return this.fb.login({scope: 'public_profile,email'})
      .then((response: LoginResponse) => {
        const access_token = response.authResponse.accessToken;
        return this.connect.loginService(access_token);
      }).catch((error: any) => console.error(error));
  }

}

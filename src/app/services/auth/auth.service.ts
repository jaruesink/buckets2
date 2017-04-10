import { Injectable } from '@angular/core';
import { FacebookService, LoginResponse } from 'ng2-facebook-sdk';
import { ConnectService } from '../connect/connect.service';

@Injectable()
export class AuthService {

  me: any;

  constructor(private fb: FacebookService, private connect: ConnectService) { }

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

  login() {
    return this.fb.login()
      .then((response: LoginResponse) => {
        const access_token = response.authResponse.accessToken;
        return this.connect.loginService(access_token);
      }).catch((error: any) => console.error(error));
  }

}

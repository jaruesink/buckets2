import { Component } from '@angular/core';
import { FacebookService, LoginResponse } from 'ng2-facebook-sdk';

declare var require: any;
const feathers = require('feathers/client');
const rest = require('feathers-rest/client');

@Component({
  selector: 'login-page',
  template: `
  <h1>{{title}}</h1>
  <button (click)="login()">Login</button>
  `,
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  title = 'Login Page!';
  api = feathers().configure(rest('http://localhost:3000').fetch(fetch));
  userService = this.api.service('api/user');
  constructor(private fb: FacebookService) {}
  login() {
    this.fb.login()
      .then((response: LoginResponse) => {
        const access_token = response.authResponse.accessToken;
        this.userService.get(access_token, (err) => { console.error(err); })
          .then((user) => {
            console.log(user);
          });
      }).catch((error: any) => console.error(error));
  }
}

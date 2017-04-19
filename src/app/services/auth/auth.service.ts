import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService, LoginResponse } from 'ngx-facebook';
import { ConnectService } from '../connect/connect.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  me: any;
  constructor(
    public router: Router,
    private fb: FacebookService,
    private connect: ConnectService
  ) {  }

  checkLogin(): Observable<any> {
    return Observable
    .fromPromise(this.fb.getLoginStatus())
    .map(({authResponse}) => {
      if (this.connect.current_path === '/login') {
        this.router.navigate(['/']);
      }
      this.connect.isLoading = false;
      if (authResponse) { return authResponse; }
      throw new Error('user is not logged in');
    })
    .catch(error => {
      this.router.navigate(['/login']).then(() => {
        this.connect.isLoading = false;
      });
      return Observable.throw(`Error: ${error}`)
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

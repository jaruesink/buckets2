import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService, LoginResponse, AuthResponse } from 'ngx-facebook';
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

  getUser(authResponse): Observable<any> {
    const access_token = authResponse.accessToken
    return this.connect.loginService(access_token);
  };

  checkLogin(): Observable<any> {
    return Observable
    .fromPromise(this.fb.getLoginStatus())
    .flatMap(({authResponse}) => {
      // console.log('Login Status Response from FB: ', authResponse);
      if (this.connect.current_path === '/login') {
        this.router.navigate(['/']);
      }
      this.connect.isLoading = false;
      if (this.me) { return Observable.of(this.me); }
      if (authResponse) { return this.getUser(authResponse); }
      throw new Error('user is not logged in');
    })
    .catch(error => {
      this.router.navigate(['/login']).then(() => {
        this.connect.isLoading = false;
      });
      return Observable.throw(`Error: ${error}`)
    });
  }

  login(): Observable<any> {
    return Observable
      .fromPromise(this.fb.login({scope: 'public_profile,email'}))
      .flatMap(({authResponse}: LoginResponse) => {
        // console.log('Login Response from FB: ', authResponse);
        if (authResponse) { return this.getUser(authResponse); }
        throw new Error('user could not be logged in');
      })
      .catch((error: any) => Observable.throw(`Error: ${error}`));
  }

}

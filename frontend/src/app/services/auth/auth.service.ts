import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookService, LoginResponse, AuthResponse } from 'ngx-facebook';
import { ConnectService } from '../connect/connect.service';
import { Observable, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  me: any;
  me$: Observable<any>;
  _me: ReplaySubject<any> = new ReplaySubject();
  constructor(
    public router: Router,
    private fb: FacebookService,
    private connect: ConnectService
  ) {
    this.me$ = Observable.from(this._me);
    this.me$.subscribe(me => this.me = me);
  }

  getUser(authResponse): Observable<any> {
    const access_token = authResponse.accessToken
    return this.connect.loginService(access_token);
  };

  checkLogin() {
    return this.fb.getLoginStatus().then(({authResponse}) => {
      if (authResponse) {
        if (this.connect.current_path === '/login') {
          this.router.navigate(['/']);
        }
        this.getUser(authResponse).subscribe(user => this._me.next(user));
        return authResponse;
      }
      throw new Error('user is not logged in');
    }).catch(error => console.error(error));

  }

  login(): Observable<any> {
    return Observable
      .fromPromise(this.fb.login({scope: 'public_profile,email'}))
      .flatMap(({authResponse}: LoginResponse) => {
        console.log('Login Response from FB: ', authResponse);
        if (authResponse) { return this.getUser(authResponse); }
        throw new Error('user could not be logged in');
      })
      .catch((error: any) => Observable.throw(`Error: ${error}`));
  }

}

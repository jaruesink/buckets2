import { Component } from '@angular/core';
import { AuthService } from '../../services';
import { Router } from '@angular/router';

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

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login() {
    this.auth.login().then(user => {
      console.log('Login Response', user);
      this.router.navigate(['/']);
    });
  }
}

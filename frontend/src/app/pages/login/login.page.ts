import { Component, OnInit } from '@angular/core';
import { AuthService, ConnectService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'login-page',
  template: `
  <div>
    <h1>{{title}}</h1>
    <button md-raised-button (click)="login()">Login</button>
  </div>
  `,
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  title = 'Login Page!';

  constructor(
    private auth: AuthService,
    private connect: ConnectService,
    private router: Router,
  ) {}

  login() {
    this.auth.login().subscribe((response) => {
      this.router.navigate(['/']);
    });
  }
}

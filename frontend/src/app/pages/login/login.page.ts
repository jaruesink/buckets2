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
export class LoginPage implements OnInit {
  title = 'Login Page!';

  constructor(
    private auth: AuthService,
    private connect: ConnectService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.connect.isLoading = false;
  }

  login() {
    this.auth.login().subscribe((response) => {
      this.router.navigate(['/']);
    });
  }
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ConnectService } from '../../services';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: string;
  constructor(
    public auth: AuthService,
    public connect: ConnectService,
    private router: Router
  ) {}
  goBack() {
    if (this.connect.previous_path) {
      this.router.navigate([this.connect.previous_path]);
    } else {
      this.router.navigate(['/']);
    }
  }
}

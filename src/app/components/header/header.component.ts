import { Component, Input } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: string;
  constructor(public auth: AuthService) {}
}

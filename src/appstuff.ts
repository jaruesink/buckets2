// Pages
import { Routes } from '@angular/router'
import { HomePage, LoginPage } from './app/pages';

export const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'login', component: LoginPage }
];

export const Pages = [ HomePage, LoginPage ];

// Components
import { AppComponent } from './app/app.component';
import { LoaderComponent } from './app/components';
export const Components = [ AppComponent, LoaderComponent ];

// Modules
import { FacebookModule } from 'ng2-facebook-sdk';
export const Modules = [ FacebookModule.forRoot() ];

// Services
import { FacebookService } from 'ng2-facebook-sdk';
import { AuthService, ConnectService } from './app/services';
export const Services = [ FacebookService, AuthService, ConnectService ];

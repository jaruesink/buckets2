// Pages
import { Routes } from '@angular/router'
import { AddbucketPage, HomePage, LoginPage } from './app/pages';

export const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'addbucket', component: AddbucketPage },
  { path: 'login', component: LoginPage }
];

export const Pages = [ AddbucketPage, HomePage, LoginPage ];

// Components
import { AppComponent } from './app/app.component';
import { LoaderComponent, HeaderComponent } from './app/components';
export const Components = [ AppComponent, LoaderComponent, HeaderComponent ];

// Modules
import { FacebookModule } from 'ng2-facebook-sdk';
export const Modules = [ FacebookModule.forRoot() ];

// Services
import { FacebookService } from 'ng2-facebook-sdk';
import { AuthService, ConnectService } from './app/services';
export const Services = [ FacebookService, AuthService, ConnectService ];

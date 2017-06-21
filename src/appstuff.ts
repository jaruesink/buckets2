// Pages
import { Routes } from '@angular/router'
import { AddbucketPage, BucketPage, HomePage, LoginPage } from './app/pages';

export const appRoutes: Routes = [
  { path: '', component: HomePage },
  { path: 'addbucket', component: AddbucketPage },
  { path: 'bucket/:id', component: BucketPage },
  { path: 'login', component: LoginPage },
];

export const Pages = [ AddbucketPage, BucketPage, HomePage, LoginPage ];

// Components
import { AppComponent } from './app/app.component';
import {
  HeaderComponent,
  BucketlistComponent
} from './app/components';
export const Components = [
  AppComponent,
  HeaderComponent,
  BucketlistComponent
];

// Modules
import { FacebookModule } from 'ngx-facebook';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export const Modules = [ FacebookModule.forRoot(), BrowserAnimationsModule ];

// Angular Material Modules
import {
  MdButtonModule,
  MdProgressBarModule,
  MdToolbarModule
} from '@angular/material';
export const AngularMaterialModules = [
  MdButtonModule,
  MdProgressBarModule,
  MdToolbarModule
];

// Services
import { FacebookService } from 'ngx-facebook';
import {
  AuthService,
  ConnectService,
  BucketService
} from './app/services';
export const Services = [
  FacebookService,
  AuthService,
  ConnectService,
  BucketService
];

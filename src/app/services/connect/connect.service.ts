import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare var require: any;
const feathers = require('feathers/client');
const reactive = require('feathers-reactive');
const RxJS = require('rxjs');
const rest = require('feathers-rest/client');
import { Subject } from 'rxjs';

@Injectable()
export class ConnectService {
  auth$: Subject<any> = new Subject();
  previous_path: string;
  current_path: string;
  api = feathers()
    .configure(reactive(RxJS))
    .configure(rest(environment.restUrl).fetch(window.fetch.bind(window)));
  isLoading:boolean;

  constructor() {
    console.log('restUrl', environment.restUrl);
 }

  service(type) {
      return this.api.service(`api/${type}`);
  }

  loginService(access_token) {
    return this.service('login').get(access_token);
  }

}

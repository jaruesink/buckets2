import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare var require: any;
const feathers = require('feathers/client');
const hooks = require('feathers-hooks');
const reactive = require('feathers-reactive');
const RxJS = require('rxjs');
const rest = require('feathers-rest/client');
import { Subject } from 'rxjs';

@Injectable()
export class ConnectService {
  previous_path: string;
  current_path: string;
  api = feathers()
    .configure(reactive(RxJS))
    .configure(hooks())
    .configure(rest(environment.restUrl)
    .fetch(window.fetch.bind(window)));
  isLoading:boolean;

  constructor() {
    console.log('environment >>>', environment);
    this.api.hooks({
      error(hook) {
        console.error(hook);
      }
    })
 }

  service(type) {
    return this.api.service(`api/${type}`);
  }

  loginService(access_token) {
    return this.service('login').get(access_token);
  }

}

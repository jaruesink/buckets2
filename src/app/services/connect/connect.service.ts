import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

declare var require: any;
const feathers = require('feathers/client');
const rest = require('feathers-rest/client');

@Injectable()
export class ConnectService {

  api = feathers().configure(rest(environment.restUrl).fetch(window.fetch.bind(window)));
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

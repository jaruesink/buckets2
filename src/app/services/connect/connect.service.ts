import { Injectable } from '@angular/core';

declare var require: any;
const feathers = require('feathers/client');
const rest = require('feathers-rest/client');

@Injectable()
export class ConnectService {

  api = feathers().configure(rest('http://localhost:3000').fetch(window.fetch.bind(window)));

  constructor() { }

  service(type) {
      return this.api.service(`api/${type}`);
  }

  loginService(access_token) {
    return this.service('login').get(access_token);
  }

}

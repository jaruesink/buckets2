import { TestBed, inject, async } from '@angular/core/testing';
import { FacebookService } from 'ng2-facebook-sdk';

import { AuthService } from './auth.service';
import { ConnectService } from '../connect/connect.service';

describe('AuthService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ AuthService, ConnectService, FacebookService ]
    });
  }));

  it('should load self', async(() => {
    inject([ AuthService ], (service: AuthService) => {
      expect(service).toBeTruthy();
    })
  }));

  it('should load FacebookService', async(() => {
    inject([ FacebookService ], (service: FacebookService) => {
      expect(service).toBeTruthy();
    })
  }));

  it('should load ConnectService', async(() => {
    inject([ ConnectService ], (service: ConnectService) => {
      expect(service).toBeTruthy();
    })
  }));
});

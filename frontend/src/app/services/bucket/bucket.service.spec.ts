import { TestBed, inject } from '@angular/core/testing';

import { BucketService } from './bucket.service';
import { AuthService } from '../auth/auth.service';
import { ConnectService } from '../connect/connect.service';

describe('BucketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, BucketService, ConnectService]
    });
  });

  it('should ...', inject([BucketService], (service: BucketService) => {
    expect(service).toBeTruthy();
  }));
});

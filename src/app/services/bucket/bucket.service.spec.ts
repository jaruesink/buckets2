import { TestBed, inject } from '@angular/core/testing';

import { BucketService } from './bucket.service';
import { ConnectService } from '../connect/connect.service';

describe('BucketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BucketService, ConnectService]
    });
  });

  it('should ...', inject([BucketService], (service: BucketService) => {
    expect(service).toBeTruthy();
  }));
});

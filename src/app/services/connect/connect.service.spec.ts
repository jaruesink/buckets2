import { TestBed, inject, async } from '@angular/core/testing';

import { ConnectService } from './connect.service';

describe('ConnectService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ConnectService]
    });
  }));

  it('should load self', async(() => {
    inject([ ConnectService ], (service: ConnectService) => {
      expect(service).toBeTruthy();
    })
  }));
});

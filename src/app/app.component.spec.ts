import { TestBed, async, inject } from '@angular/core/testing';
import { FacebookService } from 'ng2-facebook-sdk';
import { RouterTestingModule } from '@angular/router/testing';

import { appRoutes, Components, Modules, Services, Pages } from '../appstuff';
import { AuthService, ConnectService } from './services';

const AppComponent = Components[0];

const title = 'hello world!'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Components
      ],
      providers: [
        FacebookService, AuthService, ConnectService
      ],
      imports: [ RouterTestingModule ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    inject([FacebookService], (fb: FacebookService) => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });
  }));

  it('should render the router outlet', async(() => {
    inject([FacebookService], (fb: FacebookService) => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('router-outlet')).toBeTruthy();
    });
  }));

});

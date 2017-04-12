import { TestBed, inject, async } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { AuthService, ConnectService } from '../../services';
import { FacebookService } from 'ng2-facebook-sdk';

import { RouterTestingModule } from '@angular/router/testing';

let fixture, page, compiled;

const title = 'Login Page!';
const buttonText = 'Login';

describe('LoginPage', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ LoginPage ],
      providers: [ AuthService, ConnectService, FacebookService ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPage);
    page = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  }));

  it('should load the page', async(() => {
      expect(page).toBeTruthy();
  }));

  it('should load AuthService', async(() => {
    inject([ AuthService ], (service: AuthService) => {
      expect(service).toBeTruthy();
    });
  }));

  it('should load ConnectService', async(() => {
    inject([ ConnectService ], (service: ConnectService) => {
      expect(service).toBeTruthy();
    });
  }));

  it('should load FacebookService', async(() => {
    inject([ FacebookService ], (service: FacebookService) => {
      expect(service).toBeTruthy();
    });
  }));

  it(`should render an H1 with text '${title}'`, async(() => {
    expect(compiled.querySelector('h1').textContent).toBe(title);
  }));

  it(`should render a login button with text '${buttonText}'`, async(() => {
    expect(compiled.querySelector('button').textContent).toBe(buttonText);
  }));
});

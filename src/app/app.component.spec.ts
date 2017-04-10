import { TestBed, async } from '@angular/core/testing';
import { FacebookService } from 'ng2-facebook-sdk';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService, ConnectService } from './services';

import { AppComponent } from './app.component';

const title = 'hello world!'

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        FacebookService, AuthService, ConnectService
      ],
      imports: [ RouterTestingModule ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render the router outlet', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  }));
});

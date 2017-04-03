import { TestBed, inject, async } from '@angular/core/testing';
import { FacebookService } from 'ng2-facebook-sdk';
import { LoginPage } from './login.page';

let fixture, page, compiled;

const title = 'Login Page!';
const buttonText = 'Login';

describe('LoginPage', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginPage
      ],
      providers: [
        FacebookService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(LoginPage);
    page = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  }));

  it('should load the page', async(() => {
    expect(page).toBeTruthy();
  }));

  it('should load FacebookService', async(() => {
    inject([FacebookService], (markdownService) => {
      expect(FacebookService).toBeDefined();
    })
  }));

  it(`should render an H1 with text '${title}'`, async(() => {
    expect(compiled.querySelector('h1').textContent).toBe(title);
  }));

  it(`should render a login button with text '${buttonText}'`, async(() => {
    expect(compiled.querySelector('button').textContent).toBe(buttonText);
  }));
});

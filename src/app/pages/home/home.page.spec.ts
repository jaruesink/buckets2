import { TestBed, async } from '@angular/core/testing';
import { HomePage } from './home.page';

let fixture, page, compiled;

const title = 'Home Page!'

describe('HomePage', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePage
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HomePage);
    page = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  }));

  it('should load the page', async(() => {
    expect(page).toBeTruthy();
  }));

  it(`should render an H1 with text '${title}'`, async(() => {
    expect(compiled.querySelector('h1').textContent).toBe(title);
  }));
});

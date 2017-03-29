import { TestBed, async } from '@angular/core/testing';

import { HomePage } from './home.page';

const title = 'Home Page!'

describe('HomePage', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePage
      ],
    }).compileComponents();
  }));

  it('should load the page', async(() => {
    const fixture = TestBed.createComponent(HomePage);
    const page = fixture.debugElement.componentInstance;
    expect(page).toBeTruthy();
  }));

  it(`should render an H1 with text '${title}'`, async(() => {
    const fixture = TestBed.createComponent(HomePage);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toBe(title);
  }));
});

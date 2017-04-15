import { TestBed, async } from '@angular/core/testing';
import { RouterLinkStubDirective, RouterOutletStubComponent } from '../../../../test/test_stubs/router_stubs';
import { HomePage } from './home.page';

let fixture, page, compiled;

describe('HomePage', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomePage, RouterLinkStubDirective, RouterOutletStubComponent
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

  it('should have a title', async(() => {
    expect(page.title).toBeTruthy();
  }));
});

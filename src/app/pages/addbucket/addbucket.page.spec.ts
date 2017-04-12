import { TestBed, async } from '@angular/core/testing';
import { AddbucketPage } from './addbucket.page';

let fixture, page, compiled;

describe('AddbucketPage', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddbucketPage
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AddbucketPage);
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

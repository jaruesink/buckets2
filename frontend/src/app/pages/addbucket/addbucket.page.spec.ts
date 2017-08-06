import { TestBed, async } from '@angular/core/testing';
import { AddbucketPage } from './addbucket.page';
import { RouterTestingModule } from '@angular/router/testing';
import { FacebookService } from 'ngx-facebook';
import { FormsModule } from '@angular/forms';
import { AuthService, BucketService, ConnectService } from '../../services';

let fixture, page, compiled;

describe('AddbucketPage', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddbucketPage
      ],
      providers: [
        AuthService, BucketService, ConnectService, FacebookService
      ],
      imports: [ FormsModule, RouterTestingModule ]
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

import { TestBed, async } from '@angular/core/testing';
import { BucketPage } from './bucket.page';
import { RouterTestingModule } from '@angular/router/testing';
import { FacebookService } from 'ngx-facebook';
import { FormsModule } from '@angular/forms';
import { AuthService, BucketService, ConnectService } from '../../services';

let fixture, page, compiled;

describe('BucketPage', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BucketPage
      ],
      providers: [
        AuthService, BucketService, ConnectService, FacebookService
      ],
      imports: [ FormsModule, RouterTestingModule ]
    }).compileComponents();
    fixture = TestBed.createComponent(BucketPage);
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

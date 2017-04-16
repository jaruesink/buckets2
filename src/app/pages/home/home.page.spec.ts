import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterLinkStubDirective, RouterOutletStubComponent } from '../../../../test/test_stubs/router_stubs';
import { FacebookService } from 'ng2-facebook-sdk';
import { HomePage } from './home.page';
import { BucketlistComponent } from '../../components';
import { AuthService, BucketService, ConnectService } from '../../services';

let fixture, page, compiled;

describe('HomePage', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BucketlistComponent,
        HomePage,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ],
      providers: [
        AuthService,
        BucketService,
        ConnectService,
        FacebookService
      ],
      imports: [ RouterTestingModule ]
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

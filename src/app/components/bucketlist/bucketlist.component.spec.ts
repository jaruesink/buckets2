import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FacebookService } from 'ng2-facebook-sdk';
import { BucketlistComponent } from './bucketlist.component';
import { AuthService, BucketService, ConnectService } from '../../services';

describe('BucketlistComponent', () => {
  let component: BucketlistComponent;
  let fixture: ComponentFixture<BucketlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ AuthService, BucketService, ConnectService, FacebookService ],
      declarations: [ BucketlistComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', inject([AuthService, BucketService],
    (auth: AuthService, bucketService: BucketService) => {
    expect(component).toBeTruthy();
  }));
});



// import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { FacebookService } from 'ng2-facebook-sdk';
// import { AuthService, ConnectService} from '../../services';
// import { HeaderComponent } from './header.component';
//
// describe('HeaderComponent', () => {
//   let component: HeaderComponent;
//   let fixture: ComponentFixture<HeaderComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       providers: [ AuthService, FacebookService, ConnectService ],
//       declarations: [ HeaderComponent ],
//       imports: [ RouterTestingModule ]
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(HeaderComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', inject([AuthService], (auth: AuthService) => {
//     expect(component).toBeTruthy();
//   }));
// });

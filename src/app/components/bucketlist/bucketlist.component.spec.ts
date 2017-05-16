import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FacebookService } from 'ngx-facebook';
import { LoaderComponent } from '../loader/loader.component';
import { BucketlistComponent } from './bucketlist.component';
import { AuthService, BucketService, ConnectService } from '../../services';

describe('BucketlistComponent', () => {
  let component: BucketlistComponent;
  let fixture: ComponentFixture<BucketlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ AuthService, BucketService, ConnectService, FacebookService ],
      declarations: [ BucketlistComponent, LoaderComponent ],
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

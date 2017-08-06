/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BucketcardComponent } from './bucketcard.component';

describe('BucketcardComponent', () => {
  let component: BucketcardComponent;
  let fixture: ComponentFixture<BucketcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bucketcard',
  templateUrl: './bucketcard.component.html',
  styleUrls: ['./bucketcard.component.scss']
})
export class BucketcardComponent {

  @Input('BucketData') bucket;
  constructor() { }
}
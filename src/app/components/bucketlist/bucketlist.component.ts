import { Component, OnInit } from '@angular/core';
import { AuthService, BucketService } from '../../services';

@Component({
  selector: 'bucketlist',
  templateUrl: './bucketlist.component.html',
  styleUrls: ['./bucketlist.component.scss']
})
export class BucketlistComponent implements OnInit {

  constructor(
    public bucketService: BucketService
  ) { }

  ngOnInit() { }

}

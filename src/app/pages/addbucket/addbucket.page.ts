import { Component } from '@angular/core';
import { HeaderComponent } from '../../components';

@Component({
  selector: 'addbucket-page',
  template: `
  <header [title]="title"></header>
  <form #addBucketForm="ngForm" (ngSubmit)="addBucketFormSubmit(addBucketForm)" class="margin_2">
    <label for="name">Name</label>
    <input id="name" name="name" type="text" [(ngModel)]="bucket.name"/>
    <br>
    <label for="type">Bucket Type</label>
    <select id="type" name="type" [(ngModel)]="bucket.type">
      <option value="budget">Monthly Budget</option>
      <option value="savings">Savings Goal</option>
    </select>
    <br>
    <label for="amount">Amount</label>
    <input id="amount" name="amount" type="number" min="0.01" step="0.01"  [(ngModel)]="bucket.amount" />
    <br>
    <button type="submit">Add Bucket</button>
  </form>
  `,
  styleUrls: ['./addbucket.page.scss']
})
export class AddbucketPage {
  title = 'Create Bucket';
  bucket:any = {};
  addBucketFormSubmit(form) {
    console.log(form.value);
  }
}

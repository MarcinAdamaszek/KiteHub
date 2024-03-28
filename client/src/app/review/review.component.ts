import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../_models/review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent {
  @Input() review: Review = {
    content: '',
    authorName: '',
    datePosted: new Date()
  };

  truncateDate(date: string) {
    return date.slice(0, 10);
  }
}

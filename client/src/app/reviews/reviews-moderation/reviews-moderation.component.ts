import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../../_services/review.service';
import { Review } from '../../_models/review';

@Component({
  selector: 'app-reviews-moderation',
  templateUrl: './reviews-moderation.component.html',
  styleUrls: ['./reviews-moderation.component.scss']
})
export class ReviewsModerationComponent implements OnInit {
  unapprovedReviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.getUnapprovedReviews();
  }

  getUnapprovedReviews() {
    this.reviewService.getUnapprovedReviews().subscribe({
      next: reviews => this.unapprovedReviews = reviews,
      error: err => console.log(err)
    })
  }

}

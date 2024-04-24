import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { Review } from '../_models/review';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseUrl = environment.apiUrl;
  user: User | undefined;

  constructor(private http: HttpClient) { }

  approveReview(reviewId: number) {
    return this.http.put<Review>(this.baseUrl + 'reviews/approve/' + reviewId, {});
  }

  deleteReview(reviewId: number) {
    return this.http.delete(this.baseUrl + 'reviews/' + reviewId);
  }

  postReview(content: string, spotReviewedId: string) {
    const review = {
      content: content,
      spotReviewedId: spotReviewedId
    }

    return this.http.post<Review>(this.baseUrl + 'reviews', review)
  }

  getUnapprovedReviews() {
    return this.http.get<Review[]>(this.baseUrl + 'reviews/unapproved');
  }


}

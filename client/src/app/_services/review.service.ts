import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { Review } from '../_models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  baseUrl = environment.apiUrl;
  user: User | undefined;

  constructor(private http: HttpClient) { }

  postReview(content: string, spotReviewedId: string) {
    const review = {
      content: content,
      spotReviewedId: spotReviewedId
    }

    return this.http.post<Review>(this.baseUrl + 'reviews', review)
  }
}

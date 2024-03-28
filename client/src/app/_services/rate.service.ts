import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rate } from '../_models/rate';
import { environment } from 'src/environments/environment.development';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  baseUrl = environment.apiUrl;
  user: User | undefined;
  
  constructor(private http: HttpClient) {
    
  }

  rateSpot(score: string, spotId: string) {
    const params = new HttpParams()
      .set('score', score)
      .set('spotId', spotId);

    return this.http.post<Rate>(this.baseUrl + 'rates', {}, {params})
  }
}

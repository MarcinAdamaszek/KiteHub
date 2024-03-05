import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Spot } from '../_models/spot';
import { PaginatedResult } from '../_models/pagination';
import { SpotParams } from '../_models/spot-params';
import { HttpClient } from '@angular/common/http';
import { of, map } from 'rxjs';
import { getPaginationHeaders, getPaginatedResult } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class SpotsService {
  baseUrl = environment.apiUrl;
  spots: Spot[] = [];
  paginatedResult: PaginatedResult<Spot[]> = new PaginatedResult<Spot[]>();
  memberCache = new Map();
  spotParams: SpotParams | undefined;

  constructor(private http: HttpClient) {
    this.spotParams = new SpotParams();
  }

  getSpotParams() {
    return this.spotParams;
  }

  setSpotParams(spotParams: SpotParams) {
    this.spotParams = spotParams;
  }

  // resetUserParams() {
  //   if (this.user) {
  //     this.userParams = new UserParams(this.user);
  //     return this.userParams;
  //   }
  //   return;
  // }

  getSpots(spotParams: SpotParams) {
    const response = this.memberCache.get(Object.values(spotParams).join('-'));

    if (response) return of(response);

    let params = getPaginationHeaders(spotParams.pageNumber, spotParams.pageSize);

    params = params.append('selectedMonth', spotParams.selectedMonth);


    return getPaginatedResult<Spot[]>(this.baseUrl + 'spots', params, this.http).pipe(
      map(
        response => {
          this.memberCache.set(Object.values(spotParams).join('-'), response);
          return response;
        }
      )
    )
  }

}

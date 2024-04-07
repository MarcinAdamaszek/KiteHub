import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Spot } from '../_models/spot';
import { PaginatedResult } from '../_models/pagination';
import { SpotParams } from '../_models/spot-params';
import { HttpClient } from '@angular/common/http';
import { of, map } from 'rxjs';
import { getPaginationHeaders, getPaginatedResult } from './paginationHelper';
import { SpotDetails } from '../_models/spotDetails';

@Injectable({
  providedIn: 'root'
})
export class SpotService {
  baseUrl = environment.apiUrl;
  spots: Spot[] = [];
  paginatedResult: PaginatedResult<Spot[]> = new PaginatedResult<Spot[]>();
  spotCache = new Map();
  spotParams: SpotParams | undefined;

  constructor(private http: HttpClient) {
    this.spotParams = new SpotParams();
  }

  addSpot(spot: Spot) {
    return this.http.post<Spot>(this.baseUrl + 'spots', spot);
  }

  getSpots(spotParams: SpotParams) {
    const response = this.spotCache.get(Object.values(spotParams).join('-'));

    if (response) return of(response);

    let params = getPaginationHeaders(spotParams.pageNumber, spotParams.pageSize);

    params = params.append('selectedMonth', spotParams.selectedMonth);


    return getPaginatedResult<Spot[]>(this.baseUrl + 'spots', params, this.http).pipe(
      map(
        response => {
          this.spotCache.set(Object.values(spotParams).join('-'), response);
          return response;
        }
      )
    )
  }

  getSpotDetails(spotId: number) {
    return this.http.get<SpotDetails>(this.baseUrl + 'spots/' + spotId);
  }

  getSpotParams() {
    return this.spotParams;
  }

  setSpotParams(spotParams: SpotParams) {
    this.spotParams = spotParams;
  }

}

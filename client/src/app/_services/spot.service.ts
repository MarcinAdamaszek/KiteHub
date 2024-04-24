import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Spot } from '../_models/spot';
import { PaginatedResult } from '../_models/pagination';
import { SpotParams } from '../_models/spot-params';
import { HttpClient } from '@angular/common/http';
import { of, map } from 'rxjs';
import { getPaginationHeaders, getPaginatedResult } from './paginationHelper';
import { SpotDetails } from '../_models/spotDetails';
import { SpotForm } from '../_models/spotForm';

@Injectable({
  providedIn: 'root'
})
export class SpotService {
  baseUrl = environment.apiUrl;
  spots: Spot[] = [];
  paginatedResult: PaginatedResult<Spot[]> = new PaginatedResult<Spot[]>();
  spotApprovedCache = new Map();
  spotCache = new Map();
  spotApprovedParams: SpotParams = new SpotParams();
  spotParams: SpotParams = new SpotParams();

  constructor(private http: HttpClient) {}

  approveSpot(spotId: number) {
    return this.http.put<Spot>(this.baseUrl + 'spots/approve/' + spotId, {})
  }

  deleteSpot(spotId: number) {
    return this.http.delete(this.baseUrl + 'spots/' + spotId);
  }

  updateSpot(spot: SpotForm) {
    return this.http.put<SpotForm>(this.baseUrl + 'spots', spot);
  }

  addSpot(spot: SpotForm) {
    return this.http.post<SpotForm>(this.baseUrl + 'spots', spot);
  }

  getSpots(spotParams: SpotParams, approvedOnly: boolean = true) {
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

  getApprovedSpots(spotParams: SpotParams) {
    const response = this.spotApprovedCache.get(Object.values(spotParams).join('-'));
    if (response) return of(response);

    let params = getPaginationHeaders(spotParams.pageNumber, spotParams.pageSize);

    params = params.append('selectedMonth', spotParams.selectedMonth);

    return getPaginatedResult<Spot[]>(this.baseUrl + 'spots/approved', params, this.http).pipe(
      map(
        response => {
          this.spotApprovedCache.set(Object.values(spotParams).join('-'), response);
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

  getSpotApprovedParams() {
    return this.spotApprovedParams;
  }

  setSpotParams(spotParams: SpotParams) {
    this.spotParams = spotParams;
  }

  setSpotApprovedParams(spotParams: SpotParams) {
    this.spotApprovedParams = spotParams;
  }

}

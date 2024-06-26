import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  baseUrl = environment.apiUrl;
  

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get<string[]>(this.baseUrl + 'countries');
  }
}

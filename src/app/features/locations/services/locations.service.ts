import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ILocation } from '../../../models/location/location.interface';
import { IApiMain } from '../../../models/api-main/api-main.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.api}/location`;

  onGetLocations(name: string): Observable<IApiMain<ILocation>> {
    return this.http.get<IApiMain<ILocation>>(`${this.apiUrl}?name=${name}`);
  }

  onGetLocationDetails(id: number): Observable<unknown> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}

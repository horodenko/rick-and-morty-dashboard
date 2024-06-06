import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ILocation } from '../../../models/location/location.interface';
import { IApiMain } from '../../../models/api-main/api-main.interface';
import { environment } from '../../../../environments/environment';
import { ILocationDetail } from '../../../models/location/location-detail.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.api}/location`;

  onGetLocations(
    name: string,
    pageIndex: number = 0
  ): Observable<IApiMain<ILocation>> {
    return this.http.get<IApiMain<ILocation>>(
      `${this.apiUrl}?name=${name}&page=${pageIndex + 1}`
    );
  }

  onGetLocationDetails(id: number): Observable<ILocationDetail> {
    return this.http.get<ILocationDetail>(`${this.apiUrl}/${id}`);
  }
}

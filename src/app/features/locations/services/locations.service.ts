import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    pageIndex: number = 0,
    name: string = ''
  ): Observable<IApiMain<ILocation>> {
    return this.http.get<IApiMain<ILocation>>(
      `${this.apiUrl}?page=${pageIndex + 1}&name=${name}`
    );
  }

  onGetLocationDetails(id: number): Observable<ILocationDetail> {
    return this.http.get<ILocationDetail>(`${this.apiUrl}/${id}`);
  }
}

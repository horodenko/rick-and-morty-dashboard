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

  /**
   *
   * @description Returns a list of locations based on query parameters
   * @param {string} pageIndex - The current page
   * @param {string} name - The location name passed in the search bar
   * @returns {IApiMain<ILocation>} - A list of locations (IApiMain<T[]>)
   *
   */
  onGetLocations(
    pageIndex: number = 0,
    name: string = ''
  ): Observable<IApiMain<ILocation>> {
    return this.http.get<IApiMain<ILocation>>(
      `${this.apiUrl}?page=${pageIndex + 1}&name=${name}`
    );
  }

  /**
   * @description Returns a single object containing details about a location
   * @param {number} id - The location's id
   * @returns {ILocationDetail} - A location object
   */
  onGetLocationDetails(id: number): Observable<ILocationDetail> {
    return this.http.get<ILocationDetail>(`${this.apiUrl}/${id}`);
  }
}

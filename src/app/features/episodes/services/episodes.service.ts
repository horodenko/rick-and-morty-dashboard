import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiMain } from '../../../models/api-main/api-main.interface';
import { IEpisode } from '../../../models/episode/episode.interface';
import { environment } from '../../../../environments/environment';
import { IEpisodeDetail } from '../../../models/episode/episode-detail.interface';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.api}/episode`;

  /**
   *
   * @description Returns a list of episodes based on query parameters
   * @param {string} pageIndex - The current page
   * @param {string} name - The episode name passed in the search bar
   * @returns {IApiMain<IEpisode>} - A list of episodes (IApiMain<T[]>)
   *
   */
  onGetEpisodes(
    pageIndex: number = 0,
    name: string = ''
  ): Observable<IApiMain<IEpisode>> {
    return this.http.get<IApiMain<IEpisode>>(
      `${this.apiUrl}?page=${pageIndex + 1}&name=${name}`
    );
  }

  /**
   * @description Returns a single object containing details about a episode
   * @param {number} id - The episode's id
   * @returns {IEpisodeDetail} - An episode object
   */
  onGetEpisodeDetails(id: number): Observable<IEpisodeDetail> {
    return this.http.get<IEpisodeDetail>(`${this.apiUrl}/${id}`);
  }
}

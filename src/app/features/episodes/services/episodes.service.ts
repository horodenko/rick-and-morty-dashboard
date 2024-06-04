import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiMain } from '../../../models/api-main/api-main.interface';
import { IEpisode } from '../../../models/episode/episode.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.api}/episode`;

  onGetEpisodes(
    // page: number = 0,
    name: string
  ): Observable<IApiMain<IEpisode>> {
    return this.http.get<IApiMain<IEpisode>>(`${this.apiUrl}?name=${name}`);
  }

  onGetEpisodeDetails(id: number): Observable<unknown> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}

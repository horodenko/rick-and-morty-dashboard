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

  onGetEpisodes(
    name: string = '',
    pageIndex: number = 0
  ): Observable<IApiMain<IEpisode>> {
    return this.http.get<IApiMain<IEpisode>>(
      `${this.apiUrl}?name=${name}&page=${pageIndex + 1}`
    );
  }

  onGetEpisodeDetails(id: number): Observable<IEpisodeDetail> {
    return this.http.get<IEpisodeDetail>(`${this.apiUrl}/${id}`);
  }
}

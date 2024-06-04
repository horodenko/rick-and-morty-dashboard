import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IEpisode } from '../../../../models/episode/episode.interface';
import { EpisodeService } from '../../services/episodes.service';
import { DashboardComponent } from '../../../../shared/components/dashboard/dashboard.component';
import { SearchService } from '../../../../shared/services/search.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './episodes.component.html',
  styleUrl: './episodes.component.css',
})
export class EpisodesComponent {
  constructor(
    private episodeService: EpisodeService,
    private searchService: SearchService
  ) {}

  /*
    Approach with Observable (+ async pipe in dashboard ngFor):
      episodes$: Observable<IEpisode[]>;
  */
  protected episodes: IEpisode[] = [];
  protected columns: string[] = ['name', 'air_date'];
  protected errorMessage: string = '';

  ngOnInit(): void {
    this.onFetchData(this.searchService.getSearchValue());
  }

  onFetchData(value: string): void {
    this.episodeService.onGetEpisodes(value).subscribe({
      next: data => {
        this.episodes = data.results;
        this.errorMessage = '';
      },
      error: (error: HttpErrorResponse) => {
        this.episodes = [];
        this.errorMessage = error.error.error;
      },
    });
  }
}

import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IEpisode } from '../../../../models/episode/episode.interface';
import { EpisodeService } from '../../services/episodes.service';
import { DashboardComponent } from '../../../../shared/components/dashboard/dashboard.component';
import { SearchService } from '../../../../shared/services/search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IApiMain } from '../../../../models/api-main/api-main.interface';
import { IFetchData } from '../../../../models/pagination/pagination.interface';
import { PageEvent } from '@angular/material/paginator';

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
  protected currentPage: number = 0;
  protected paginationInfo: Omit<IApiMain<IEpisode>, 'results'> = {
    info: { count: 0, pages: 0, next: null, prev: null },
  };
  protected columns: string[] = ['name', 'air_date', 'episode'];
  protected errorMessage: string = '';

  ngOnInit(): void {
    this.onFetchData(this.searchService.getSearchValue());
  }

  onFetchData(value: string, pageIndex: number = 0): void {
    this.episodeService.onGetEpisodes(value, pageIndex).subscribe({
      next: data => {
        this.episodes = data.results;
        this.paginationInfo.info = data.info;
        this.errorMessage = '';
      },
      error: (error: HttpErrorResponse) => {
        this.episodes = [];
        this.errorMessage = error.error.error;
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.onFetchData(this.searchService.getSearchValue(), event.pageIndex);
  }
}

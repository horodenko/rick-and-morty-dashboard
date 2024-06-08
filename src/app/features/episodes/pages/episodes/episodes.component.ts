import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
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
  protected currentPage: number = 0;
  protected columns: string[] = ['name', 'air_date', 'episode'];
  protected errorMessage: string = '';
  protected hasLoadedAll: boolean = false;
  protected previousValue: string = '';
  private episodeSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.onFetchData(this.searchService.getSearchValue());
  }

  onFetchData(value: string = ''): void {
    /** The following could be done so everything goes in only one function;
     *
     *  if the user is searching for the same value as he goes down the list, the list goes on,
     *  but if he searches for another value, it resets and a new list is created.
     */
    if (value !== this.previousValue) {
      this.episodes = [];
      this.currentPage = 0;
      this.hasLoadedAll = false;
    }

    /** if there are no more results to search for, stop entering the requisition */
    if (this.hasLoadedAll) return;
    this.hasLoadedAll = true;

    this.episodeService.onGetEpisodes(this.currentPage, value).subscribe({
      next: data => {
        /** if there are no more pages next and the array is not empty, unsubscribe from the observable  */
        if (!data.info.next && this.episodes.length) {
          return this.episodeSubscription.unsubscribe();
        }

        /** Keep incrementing on the list */
        this.episodes = this.episodes.concat(data.results);
        this.errorMessage = '';
        this.currentPage++;
        this.previousValue = value;
      },
      error: (error: HttpErrorResponse) => {
        /** handle error only if user has searched for a non-existent item */
        if (!this.episodes.length) {
          this.episodes = [];
          this.errorMessage = error.error.error;
        }
      },
      complete: () => {
        this.hasLoadedAll = false;
      },
    });
  }
}

import { Component } from '@angular/core';
import { LocationService } from '../../services/locations.service';
import { ILocation } from '../../../../models/location/location.interface';
import { DashboardComponent } from '../../../../shared/components/dashboard/dashboard.component';
import { SearchService } from '../../../../shared/services/search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.css',
})
export class LocationsComponent {
  constructor(
    private locationService: LocationService,
    private searchService: SearchService
  ) {}

  protected locations: ILocation[] = [];
  protected currentPage: number = 0;
  protected columns: string[] = ['name', 'type', 'dimension'];
  protected errorMessage: string = '';
  protected hasLoadedAll: boolean = false;
  protected previousValue: string = '';
  private locationSubscription: Subscription = new Subscription();

  ngAfterViewInit(): void {
    this.onFetchData(this.searchService.getSearchValue());
  }

  /** 
    @description Responsible to gather the data to fill the table 
    @param {string} value
    @returns {void}
  */
  onFetchData(value: string = ''): void {
    /** The following was done so everything goes in only one function;

     *  @description
     *  If the user is searching for the same value as he goes down the list, the list goes on,
     *  but if he searches for another value, it resets and a new list is created.
     */
    if (value !== this.previousValue) {
      this.locations = [];
      this.currentPage = 0;
      this.hasLoadedAll = false;
    }

    /**
     * @description
     * Avoids entering below requisition if there are no more results to search for
     */ if (this.hasLoadedAll) return;
    this.hasLoadedAll = true;

    this.locationService.onGetLocations(this.currentPage, value).subscribe({
      next: data => {
        /** @description Unsubscribes from Observable if there are no pages next  */
        if (!data.info.next && this.locations.length) {
          return this.locationSubscription.unsubscribe();
        }

        this.locations = this.locations.concat(data.results);
        this.errorMessage = '';
        this.currentPage++;
        this.previousValue = value;
      },
      error: (error: HttpErrorResponse) => {
        /** @description Handles error only if user has searched for a non-existent item */
        if (!this.locations.length) {
          this.locations = [];
          this.errorMessage = error.error.error;
        }
      },
      complete: () => {
        this.hasLoadedAll = false;
      },
    });
  }
}

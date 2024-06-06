import { Component, OnDestroy } from '@angular/core';
import { LocationService } from '../../services/locations.service';
import { ILocation } from '../../../../models/location/location.interface';
import { DashboardComponent } from '../../../../shared/components/dashboard/dashboard.component';
import { Subscription, catchError } from 'rxjs';
import { SearchService } from '../../../../shared/services/search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IFetchData } from '../../../../models/pagination/pagination.interface';
import { IApiMain } from '../../../../models/api-main/api-main.interface';
import { PageEvent } from '@angular/material/paginator';

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
  protected paginationInfo: Omit<IApiMain<ILocation>, 'results'> = {
    info: { count: 0, pages: 0, next: null, prev: null },
  };
  protected columns: string[] = ['name', 'type', 'dimension'];
  protected errorMessage: string = '';

  ngAfterViewInit(): void {
    this.onFetchData(this.searchService.getSearchValue());
  }

  onFetchData(value: string, pageIndex: number = 0): void {
    this.locationService.onGetLocations(value, pageIndex).subscribe({
      next: data => {
        this.locations = data.results;
        this.paginationInfo.info = data.info;
        this.errorMessage = '';
      },
      error: (error: HttpErrorResponse) => {
        this.locations = [];
        this.errorMessage = error.error.error;
      },
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.onFetchData(this.searchService.getSearchValue(), event.pageIndex);
  }
}

import { Component, OnDestroy } from '@angular/core';
import { LocationService } from '../../services/locations.service';
import { ILocation } from '../../../../models/location/location.interface';
import { DashboardComponent } from '../../../../shared/components/dashboard/dashboard.component';
import { Subscription, catchError } from 'rxjs';
import { SearchService } from '../../../../shared/services/search.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  protected columns: string[] = ['name', 'type', 'dimension'];
  protected errorMessage: string = '';

  ngAfterViewInit(): void {
    this.onFetchData(this.searchService.getSearchValue());
  }

  onFetchData(value: string): void {
    this.locationService.onGetLocations(value).subscribe({
      next: data => {
        this.locations = data.results;
        this.errorMessage = '';
      },
      error: (error: HttpErrorResponse) => {
        this.locations = [];
        this.errorMessage = error.error.error;
      },
    });
  }
}

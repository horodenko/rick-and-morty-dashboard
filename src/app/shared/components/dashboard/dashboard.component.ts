/**
 * @description
 * This component is used to create a mat-table in the a parent component,
 * where a list of results will be shown based on their data source data.
 *
 * It is used in:
 *  - characters.component
 *  - locations.component
 *  - episodes.component
 * @example
 * <app-dashboard
 *  [loading]="loading">
 *  [dataArray]="data"
 *  [columns]="columns"
 *  (emptyListMessage]="errorMessage"
 *  (fetchData)="onFetchData($event)"
 * </app-dashboard>
 */

import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { RouterModule } from '@angular/router';
import { InfiniteScrollingDirective } from '../../directives/infinite-scrolling.directive';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,

    InfiniteScrollingDirective,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent<T> {
  constructor(
    private formBuilder: FormBuilder,
    private searchService: SearchService
  ) {}

  /** Search bar */
  @Input() searchValue: string = '';
  @Output() fetchData = new EventEmitter<string>();
  protected searchForm = this.formBuilder.nonNullable.group({
    searchValue: this.searchService.getSearchValue(),
  });

  /** Table */
  @Input() dataArray: T[] = [];
  @Input() columns: string[] = [];
  @Input() emptyListMessage: string = '';

  /** Pagination */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 0;
  @Output() pageChange = new EventEmitter<PageEvent>();
  protected dataSource = new MatTableDataSource<T>(this.dataArray);
  protected allData: number = 0;
  protected displayedColumns: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = [...this.columns, 'details'];
  }

  /**
   * @description
   * Updates the search value to be shared among all pages and emits the FetchData()
   * function used in parent components
   * @returns {void}
   */
  onSearch(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.searchService.setSearchValue(this.searchValue);
    this.fetchData.emit(this.searchValue);
  }
}

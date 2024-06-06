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
import { IFetchData } from '../../../models/pagination/pagination.interface';

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 0;
  @Output() pageChange = new EventEmitter<PageEvent>();

  // @Input() currentPage: number = 0;
  // @Output() pageChange = new EventEmitter();

  protected dataSource = new MatTableDataSource<T>(this.dataArray);
  protected allData: number = 0;
  protected displayedColumns: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = [...this.columns, 'details'];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {}

  onSearch(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.searchService.setSearchValue(this.searchValue);
    this.fetchData.emit(this.searchValue);
  }

  onPageChange(event: PageEvent): void {
    console.log(event);
    this.pageChange.emit(event);
  }
}

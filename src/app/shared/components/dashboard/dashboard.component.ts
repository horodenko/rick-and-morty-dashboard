import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginator,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
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
  protected dataSource = new MatTableDataSource<T>(this.dataArray);
  protected allData = this.dataSource.data.length;
  protected displayedColumns: string[] = [];

  ngOnInit(): void {
    this.displayedColumns = [...this.columns, 'details'];
  }

  onSearch(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.searchService.setSearchValue(this.searchValue);
    this.fetchData.emit(this.searchValue);
  }
}

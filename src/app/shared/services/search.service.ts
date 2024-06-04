import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Service to keep track of the search bar's value,
 * to retain it when changing routes
 */
export class SearchService {
  constructor() {}

  private readonly SESSION_STORAGE_KEY = 'searchValue';
  private searchValueSubject = new BehaviorSubject<string>(
    this.getStoredSearchValue()
  );
  searchValue$ = this.searchValueSubject.asObservable();

  setSearchValue(value: string): void {
    this.searchValueSubject.next(value);
    sessionStorage.setItem(this.SESSION_STORAGE_KEY, value);
  }

  getSearchValue(): string {
    return this.searchValueSubject.value;
  }

  private getStoredSearchValue(): string {
    return sessionStorage.getItem(this.SESSION_STORAGE_KEY) || '';
  }
}

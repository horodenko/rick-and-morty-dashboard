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
  private searchValueSubject$ = new BehaviorSubject<string>('');

  /**
   * 
   * @description 
   * Sets value to be later catch by the getSearchValue() on components
   * that need to be aware of its usage on other components
   * @param {string} value 
   * @example
   * onSearch(): void {
      this.searchValue = this.searchForm.value.searchValue ?? '';
      this.searchService.setSearchValue(this.searchValue);
   }
    @returns {void}
   */
  setSearchValue(value: string): void {
    this.searchValueSubject$.next(value);
  }

  /**
   * @description Retrives search value
   * @returns {string}
   */
  getSearchValue(): string {
    return this.searchValueSubject$.getValue();
  }
}

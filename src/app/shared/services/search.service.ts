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

  setSearchValue(value: string): void {
    this.searchValueSubject$.next(value);
  }

  getSearchValue(): string {
    return this.searchValueSubject$.getValue();
  }
}

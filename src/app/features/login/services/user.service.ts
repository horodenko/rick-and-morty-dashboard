import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly LOCAL_STORAGE_KEY = 'username';

  /**
   *
   * @returns {string}
   */
  onRetrieveUsername(): string {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY) || '';
  }
}

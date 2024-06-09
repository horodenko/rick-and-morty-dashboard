import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {
    /**
     * @description Prevents "local storage is not defined" error
     * */
    if (typeof window !== 'undefined') {
      this.autoSignIn();
    }
  }

  private readonly LOCAL_STORAGE_KEY = 'username';
  public isAuth = new BehaviorSubject<boolean>(false);

  /**
   * @description
   * Creates local storage key 'username' after clicking on login button on nav.component
   * @param {string} username
   * @returns {void}
   */
  onSignIn(username: string): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, username);
    this.isAuth.next(true);
    this.router.navigate(['/characters']);
  }

  /**
   * @description
   * Removes local storage key 'username' after signing out on Sign out dropdown button
   * @returns {void}
   */
  onSignOut(): void {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
    this.isAuth.next(false);
    this.router.navigate(['/sign-in']);
  }

  /**
   * @description
   * Auto signs in user if he is already logged in, and tries to go to empty route page
   * @returns {void}
   */
  autoSignIn(): void {
    if (localStorage.getItem(this.LOCAL_STORAGE_KEY)) {
      this.isAuth.next(true);
    }
  }
}

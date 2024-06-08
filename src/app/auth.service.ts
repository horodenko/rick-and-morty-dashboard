import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {
    // prevent "local storage is not defined" error
    if (typeof window !== 'undefined') {
      this.autoSignIn();
    }
  }

  private readonly LOCAL_STORAGE_KEY = 'username';
  public isAuth = new BehaviorSubject<boolean>(false);

  onSignIn(username: string): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, username);
    this.isAuth.next(true);
    this.router.navigate(['/characters']);
  }

  onGetStorageKey() {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY) || '';
  }

  onSignOut() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
    this.isAuth.next(false);
    this.router.navigate(['/sign-in']);
  }

  autoSignIn() {
    if (localStorage.getItem(this.LOCAL_STORAGE_KEY)) {
      this.isAuth.next(true);
    }
  }
}

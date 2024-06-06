import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router) {
    // delete username when redirected to sign-in page (extremelly mocked and with no logic whatsoever!)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url === '/sign-in') {
          this.onDeleteStorageKey();
        }
      }
    });
  }

  private readonly LOCAL_STORAGE_KEY = 'username';

  private usernameSource$ = new BehaviorSubject<string>('');
  public currentUsername$ = this.usernameSource$.asObservable();

  onChangeUsername(username: string): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, username);
    this.usernameSource$.next(this.onGetStorageKey());
  }

  isAuthenticated(): boolean {
    return !!this.onGetStorageKey();
  }

  onGetStorageKey() {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY) || '';
  }

  onDeleteStorageKey() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
    this.usernameSource$.next('');
  }
}

import { Component, HostListener, ViewChild } from '@angular/core';
import { NavigationStart, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../../../features/login/services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  constructor(private userService: UserService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url === '/sign-in') {
          this.drawer.close();
        }
      }
    });
  }

  username: string = '';

  @ViewChild('drawer') drawer!: MatDrawer;
  @HostListener('window:resize')
  onWindowResize() {
    this.onSetDrawerMode();
  }

  protected isOpen: boolean = false;

  ngOnInit(): void {
    this.userService.onChangeUsername(this.userService.onGetStorageKey());
    this.userService.currentUsername$.subscribe(
      username => (this.username = username)
    );
  }

  ngAfterViewChecked(): void {
    this.onSetDrawerMode();
  }

  onSetDrawerMode = (): string =>
    window.innerWidth < 768
      ? (this.drawer.mode = 'over')
      : (this.drawer.mode = 'side');

  isUserAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }
}

import { Component, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../../../features/login/services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../auth.service';

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
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // hide header when in login page;
        // couldnt treat it with authentication,
        // because app-nav is parent of router-outlet.
        if (event.url === '/sign-in') {
          this.isInSignInPage = true;
          this.drawer.close();
        } else this.isInSignInPage = false;
      }
    });
  }

  @ViewChild('drawer') drawer!: MatDrawer;

  protected username: string = '';
  protected isInSignInPage: boolean = false;
  protected changedHeightClass: string = '';

  ngAfterViewChecked(): void {
    this.username = this.userService.onRetrieveUsername();
  }

  onSignOut = (): void => this.authService.onSignOut();
}

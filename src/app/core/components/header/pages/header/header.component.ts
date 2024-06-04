import { Component, HostListener, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from '../../../sidebar/pages/sidebar.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,

    SidebarComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @ViewChild('drawer') drawer!: MatDrawer;
  @HostListener('window:resize')
  onWindowResize() {
    this.onSetDrawerMode();
  }

  ngAfterViewInit(): void {
    this.onSetDrawerMode();
  }

  onSetDrawerMode = () =>
    window.innerWidth < 768
      ? (this.drawer.mode = 'over')
      : (this.drawer.mode = 'side');
}

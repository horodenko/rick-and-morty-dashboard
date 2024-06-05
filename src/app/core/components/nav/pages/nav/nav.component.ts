import {
  AfterViewChecked,
  Component,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterModule,
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
  @ViewChild('drawer') drawer!: MatDrawer;
  @HostListener('window:resize')
  onWindowResize() {
    this.onSetDrawerMode();
  }

  protected isOpen: boolean = false;

  ngAfterViewChecked(): void {
    this.onSetDrawerMode();
  }

  onSetDrawerMode = () =>
    window.innerWidth < 768
      ? (this.drawer.mode = 'over')
      : (this.drawer.mode = 'side');
}

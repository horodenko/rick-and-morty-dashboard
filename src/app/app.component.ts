import { Component } from '@angular/core';
import { NavComponent } from './core/components/nav/pages/nav/nav.component';
import { environment } from '../environments/environment';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor() {}

  title = 'rick-and-morty-dashboard';
}

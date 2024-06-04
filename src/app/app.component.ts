import { Component } from '@angular/core';
import { HeaderComponent } from './core/components/header/pages/header/header.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor() {}

  title = 'rick-and-morty-dashboard';
}

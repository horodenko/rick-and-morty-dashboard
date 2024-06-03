import { Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(protected dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService
      .onGetCharacters(1)
      .subscribe(value => console.log(value));
  }
}

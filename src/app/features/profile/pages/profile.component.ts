import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../../login/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(private userService: UserService) {}

  protected username: string = '';

  ngOnInit(): void {
    this.username = this.userService.onRetrieveUsername();
  }
}

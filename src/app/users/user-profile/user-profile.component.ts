import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  userString = localStorage.getItem('authenticatedUser');
  user!: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.userString) {
      this.user = JSON.parse(this.userString);
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {

  constructor(private authService: AuthService) {

  }

  logout(): void {
    this.authService.logout();
  }

  isLogged(): boolean {
    return this.authService.isLoggedIn();
  }
}

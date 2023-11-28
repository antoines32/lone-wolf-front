import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/models/user';
import { UserProfileComponent } from '../users/user-profile/user-profile.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, UserProfileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {

  isLogged!: Subscription;
  result: boolean = false;
  currentUser!: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogged = this.authService.authenticatedUser$.subscribe({
      next: user => {
        if (user) {
          this.currentUser = user;
          this.result = true;
        } else {
          this.result = false;
        }
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.isLogged.unsubscribe()
  }

}

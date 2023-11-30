import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/models/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  routes = [
    // disconnected routes
    { route: 'home', label: 'Home', isConnectedRoute: false },
    { route: 'login', label: 'Connexion', isConnectedRoute: false },
    { route: 'register', label: "S'inscrire", isConnectedRoute: false },
    // connected routes
    { route: 'home', label: 'Home', isConnectedRoute: true },
    { route: 'user', label: 'Mon profil', isConnectedRoute: true },
    { route: 'logout', label: 'Déconnexion', isConnectedRoute: true },
  ];
  currentUser!: User;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.authenticatedUser$.subscribe({
      next: (user) => {
        if (user) {
          this.currentUser = user;
        }
      },
    });
  }

  navigate(routeName: string) {
    if (routeName === 'logout') {
      this.auth.logout();
    } else {
      this.router.navigate([`${routeName}`]);
    }
  }
}

import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./users/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent
      ),
    data: { roles: ['admin', 'user'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'adventure-menu',
    loadComponent: () =>
      import('./adventure/adventure-menu/adventure-menu.component').then(
        (m) => m.AdventureMenuComponent
      ),
    data: { roles: ['admin', 'user'] },
    canActivate: [AuthGuard],
  },
  {
    path: 'adventure-create',
    loadComponent: () =>
      import('./adventure/adventure-create/adventure-create.component').then(
        (m) => m.AdventureCreateComponent
      ),
    data: { roles: ['admin', 'user'] },
    canActivate: [AuthGuard],
  },
];

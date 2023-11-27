import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs';
import { User } from '../users/models/user';

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.authenticatedUser$.pipe(
    take(1),
    map((user) => {
      // check if route is restricted by role
      const { roles } = route.data;
      if (user && user.userRole && roles.includes(user.userRole)) {
        return true;
      }
      if (user) {
        return router.createUrlTree(['/forbidden']);
      }
      return router.createUrlTree(['/login']);
    })
  );
};

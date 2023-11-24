import { CanActivateFn, Router } from '@angular/router';

const router = new Router();

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('accessToken')
  if (token != null) {
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};

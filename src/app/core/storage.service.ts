import { Injectable } from '@angular/core';
import { User } from '../users/models/user';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  saveUserAndToken(user: User, token: string): void {
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('accessToken');
    localStorage.setItem('authenticatedUser', JSON.stringify(user));
    localStorage.setItem('accessToken', token);
  }

  getUser(): User | null {
    const userString = localStorage.getItem('authenticatedUser');
    if (!userString) {
      return null;
    }
    return JSON.parse(userString);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  clean() {
    localStorage.clear();
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { User } from './models/user';
import { BASE_URL } from '../core/constants';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { UpdateUser } from './models/update-user';
import { StorageService } from '../core/storage.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.storage.getToken()}`,
  });
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string,
    private storage: StorageService,
    private auth: AuthService
  ) {}

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`, {
      headers: this.header,
    });
  }

  updateUser(mail: string, user: UpdateUser) {
    return this.http
      .patch<User>(`${this.baseUrl}/users/${mail}`, user, {
        headers: this.header,
      })
      .pipe(
        catchError((err) => {
          let errorMessage = 'An unknown error occurred!';
          if (err.error.message === 'unauthorized') {
            errorMessage = 'user is logged out';
          }
          return throwError(() => new Error(errorMessage));
        }),
        tap((user) => {
          this.storage.saveUser(user);
          this.auth.authenticatedUser$.next(user);
        })
      );
  }
}

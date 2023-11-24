import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CreateUser } from './models/create-user';
import { LoginUser } from './models/login-user';
import { BASE_URL } from '../core/constants';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string,
    private router: Router
  ) { }

  login(loginUser: LoginUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, loginUser);
  }

  signUp(createUser: CreateUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, createUser);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token !== null ? true : false;
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['home']);
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(msg));
  }
}

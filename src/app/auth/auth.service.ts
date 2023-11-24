import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError, BehaviorSubject } from 'rxjs';
import { CreateUser } from './models/create-user';
import { LoginUser } from './models/login-user';
import { BASE_URL } from '../core/constants';
import { Router } from '@angular/router';
import { AuthResponseData } from './models/auth-response-data';
import { User } from '../users/models/user';
import { StorageService } from '../core/storage.service';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticatedUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string,
    private router: Router,
    private storage: StorageService
  ) { }

  login(loginUser: LoginUser): Observable<any> {
    return this.http.post<AuthResponseData>(`${this.baseUrl}/auth/login`, loginUser).pipe(
      catchError(err => {
        let errorMessage = 'An unknown error occurred!';
        if (err.error.message === 'Bad credential') {
          errorMessage = 'The email address or password you entered is invalid'
        }
        return throwError(() => new Error(errorMessage))
      }),
      tap(
        (responseData: AuthResponseData) => {
          this.storage.saveUserAndToken(responseData.authenticated_user, responseData.access_token);
          this.authenticatedUser$.next(responseData.authenticated_user);
        }
      )
    );
  }

  signUp(createUser: CreateUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, createUser);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  logout() {
    this.storage.clean();
    this.authenticatedUser$.next(null);
    //this.router.navigate(['home']);
  }

  autoLogin() {
    const connectedUser = this.storage.getUser()
    if (connectedUser) {
      this.authenticatedUser$.next(connectedUser);
    }
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

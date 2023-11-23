import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUser } from './models/create-user';
import { LoginUser } from './models/login-user';
import { BASE_URL } from '../core/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {}

  login(loginUser: LoginUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, loginUser);
  }

  signOn(createUser: CreateUser): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, createUser);
  }
}

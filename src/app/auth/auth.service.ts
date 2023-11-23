import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginUser } from './models/login-user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginUser: LoginUser): Observable<any> {
    return this.http.post('http://127.0.0.1:3000/auth/login', loginUser);
  }
}

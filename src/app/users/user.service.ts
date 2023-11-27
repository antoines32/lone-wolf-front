import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { User } from './models/user';
import { BASE_URL } from '../core/constants';
import { Observable } from 'rxjs';
import { UpdateUser } from './models/update-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {}

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  updateUser(user: UpdateUser) {
    return this.http.patch<User>(`${this.baseUrl}/users/id`, user);
  }
}

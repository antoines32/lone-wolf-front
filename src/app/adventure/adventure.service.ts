import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../core/constants';
import { StorageService } from '../core/storage.service';
import { KaiDiscipline } from './model/kai-discipline.model';

@Injectable({
  providedIn: 'root',
})
export class AdventureService {
  header = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.storage.getToken()}`,
  });
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string,
    private storage: StorageService
  ) {}

  createNewGame(bookName: String) {}

  getKaiDisciplines(): Observable<KaiDiscipline[]> {
    return this.http.get<KaiDiscipline[]>(`${this.baseUrl}/kai-discipline`, {
      headers: this.header,
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://rickandmortyapi.com/api';

  onGetCharacters(page: number, name: string = ''): Observable<any> {
    return this.http.get(`${this.apiUrl}/character?page=${page}&name=${name}`);
  }

  onGetCharacterDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/character/${id}`);
  }
}

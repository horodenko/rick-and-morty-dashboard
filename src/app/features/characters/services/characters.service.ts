import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'https://rickandmortyapi.com/api/character';

  onGetCharacters(page: number, name: string = ''): Observable<unknown> {
    return this.http.get(`${this.apiUrl}?page=${page}&name=${name}`);
  }

  onGetCharacterDetails(id: number): Observable<unknown> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IApiMain } from '../../../models/api-main/api-main.interface';
import { ICharacter } from '../../../models/character/character.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.api}/character`;

  onGetCharacters(name: string = ''): Observable<IApiMain<ICharacter>> {
    return this.http.get<IApiMain<ICharacter>>(`${this.apiUrl}?name=${name}`);
  }

  onGetCharacterDetails(id: number): Observable<unknown> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}

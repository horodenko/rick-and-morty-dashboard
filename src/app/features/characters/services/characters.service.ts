import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { IApiMain } from '../../../models/api-main/api-main.interface';
import { ICharacter } from '../../../models/character/character.interface';
import { environment } from '../../../../environments/environment';
import { ICharacterDetail } from '../../../models/character/character-detail.interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  private apiUrl = `${environment.api}/character`;

  onGetCharacters(
    name: string,
    pageIndex: number = 0
  ): Observable<IApiMain<ICharacter>> {
    return this.http.get<IApiMain<ICharacter>>(
      `${this.apiUrl}?name=${name}&page=${pageIndex + 1}`
    );
  }

  onGetCharacterDetails(id: number): Observable<ICharacterDetail> {
    return this.http.get<ICharacterDetail>(`${this.apiUrl}/${id}`);
  }
}

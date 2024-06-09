import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  /**
   *
   * @description Returns a list of characters based on query parameters
   * @param {string} pageIndex - The current page
   * @param {string} name - The character name passed in the search bar
   * @returns {IApiMain<ICharacter>} - A list of characters (IApiMain<T[]>)
   *
   */
  onGetCharacters(
    pageIndex: number = 0,
    name: string = ''
  ): Observable<IApiMain<ICharacter>> {
    return this.http.get<IApiMain<ICharacter>>(
      `${this.apiUrl}?page=${pageIndex + 1}&name=${name}`
    );
  }

  /**
   * @description Returns a single object containing details about a character
   * @param {number} id - The character's id
   * @returns {ICharacterDetail} - A character object
   */
  onGetCharacterDetails(id: number): Observable<ICharacterDetail> {
    return this.http.get<ICharacterDetail>(`${this.apiUrl}/${id}`);
  }
}

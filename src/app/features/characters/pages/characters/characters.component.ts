import { Component } from '@angular/core';
import { ICharacter } from '../../../../models/character/character.interface';
import { CharacterService } from '../../services/characters.service';
import { DashboardComponent } from '../../../../shared/components/dashboard/dashboard.component';
import { SearchService } from '../../../../shared/services/search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-characters',
  standalone: true,
  imports: [DashboardComponent],
  templateUrl: './characters.component.html',
  styleUrl: './characters.component.css',
})
export class CharactersComponent {
  constructor(
    private characterService: CharacterService,
    private searchService: SearchService
  ) {}

  protected characters: ICharacter[] = [];
  protected currentPage: number = 0;
  protected columns: string[] = ['name', 'status', 'species', 'gender'];
  protected errorMessage: string = '';
  protected hasLoadedAll: boolean = false;
  protected previousValue: string = '';
  private characterSubscription: Subscription = new Subscription();

  ngAfterViewInit(): void {
    this.onFetchData(this.searchService.getSearchValue());
  }

  onFetchData(value: string = ''): void {
    /** The following could be done so everything goes in only one function;
     *
     *  if the user is searching for the same value as he goes down the list, the list goes on,
     *  but if he searches for another value, it resets and a new list is created.
     */
    if (value !== this.previousValue) {
      this.characters = [];
      this.currentPage = 0;
      this.hasLoadedAll = false;
    }

    /** if there are no more results to search for, stop entering the requisition */
    if (this.hasLoadedAll) return;
    this.hasLoadedAll = true;

    this.characterSubscription = this.characterService
      .onGetCharacters(this.currentPage, value)
      .subscribe({
        next: data => {
          /** if there are no more pages next, unsubscribe from the observable  */
          if (!data.info.next && this.characters.length) {
            return this.characterSubscription.unsubscribe();
          }

          /** Keep incrementing on the list */
          this.characters = this.characters.concat(data.results);
          this.errorMessage = '';
          this.currentPage++;
          this.previousValue = value;
        },
        error: (error: HttpErrorResponse) => {
          this.characters = [];
          this.errorMessage = error.error.error;
        },
        complete: () => {
          this.hasLoadedAll = false;
        },
      });
  }
}

import { Component, OnDestroy } from '@angular/core';
import { ICharacter } from '../../../../models/character/character.interface';
import { CharacterService } from '../../services/characters.service';
import { DashboardComponent } from '../../../../shared/components/dashboard/dashboard.component';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../../shared/services/search.service';
import { HttpErrorResponse } from '@angular/common/http';

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
  protected columns: string[] = ['name', 'status', 'species', 'gender'];
  protected errorMessage: string = '';

  ngOnInit(): void {
    this.onFetchData(this.searchService.getSearchValue());
  }

  onFetchData(value: string): void {
    this.characterService.onGetCharacters(value).subscribe({
      next: data => {
        this.characters = data.results;
        this.errorMessage = '';
      },
      error: (error: HttpErrorResponse) => {
        this.characters = [];
        this.errorMessage = error.error.error;
      },
    });
  }
}

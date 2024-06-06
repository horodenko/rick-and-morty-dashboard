import { Component, OnDestroy } from '@angular/core';
import { ICharacter } from '../../../../models/character/character.interface';
import { CharacterService } from '../../services/characters.service';
import { DashboardComponent } from '../../../../shared/components/dashboard/dashboard.component';
import { Subscription } from 'rxjs';
import { SearchService } from '../../../../shared/services/search.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IApiMain } from '../../../../models/api-main/api-main.interface';
import { PageEvent } from '@angular/material/paginator';

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
  protected page: number = 0;
  protected paginationInfo: Omit<IApiMain<ICharacter>, 'results'> = {
    info: { count: 0, pages: 0, next: null, prev: null },
  };
  protected pageSize: number = 0;
  protected columns: string[] = ['name', 'status', 'species', 'gender'];
  protected errorMessage: string = '';

  ngOnInit(): void {
    this.onFetchData(this.searchService.getSearchValue());
  }

  onFetchData(
    value: string,
    pageIndex: number = 0,
    pagInfo: Omit<IApiMain<ICharacter>, 'results'> = {
      info: { count: 0, pages: 0, next: null, prev: null },
    }
  ): void {
    this.characterService.onGetCharacters(value, pageIndex).subscribe({
      next: data => {
        debugger;
        this.characters = data.results;
        this.paginationInfo.info = data.info;
        this.errorMessage = '';
      },
      error: (error: HttpErrorResponse) => {
        this.characters = [];
        this.errorMessage = error.error.error;
      },
    });
  }

  onPageChange(event: PageEvent): void {
    console.log(event);
    this.page = event.pageIndex;
    this.onFetchData(this.searchService.getSearchValue(), event.pageIndex);
  }
}

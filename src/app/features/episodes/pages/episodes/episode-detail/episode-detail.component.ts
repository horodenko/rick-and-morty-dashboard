import { Component } from '@angular/core';
import { EpisodeService } from '../../../services/episodes.service';
import { CharacterService } from '../../../../characters/services/characters.service';
import { ICharacterDetail } from '../../../../../models/character/character-detail.interface';
import { IEpisodeDetail } from '../../../../../models/episode/episode-detail.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-episode-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './episode-detail.component.html',
  styleUrl: './episode-detail.component.css',
})
export class EpisodeDetailComponent {
  constructor(
    private episodeService: EpisodeService,
    private characterService: CharacterService,
    private route: ActivatedRoute
  ) {}

  protected routeID: string = '';
  protected episodeDetails: IEpisodeDetail | undefined;
  protected episodeExists: boolean = false;
  protected characterInfos: ICharacterDetail[] = [];
  protected selectedCharacterID: number | undefined;

  ngOnInit(): void {
    this.route.params.subscribe(param => (this.routeID = param['id']));
    this.onLoadEpisodeDetails();
  }

  /**
   * @returns {void}
   */
  onLoadEpisodeDetails(): void {
    this.episodeService.onGetEpisodeDetails(Number(this.routeID)).subscribe({
      next: data => {
        this.episodeDetails = data;
        this.episodeExists = true;
        this.onRetrieveCharacters();
      },
      error: () => {
        this.episodeDetails = undefined;
        this.episodeExists = false;
      },
    });
  }

  /**
   * @returns {void}
   */
  onRetrieveCharacters(): void {
    /**
     * @description
     * Gets array of route strings and returns only their IDs into a new array
     * */
    const residentIDs = this.episodeDetails?.characters.map(url =>
      url.split('/').pop()
    );

    /**
     * @description
     * Makes a requisition for all characters using each of their IDs
     * */
    const requests = residentIDs!.map(id =>
      this.characterService.onGetCharacterDetails(Number(id))
    );

    /**
     * @description
     * Assigns characters to completed observables
     * */
    forkJoin<ICharacterDetail[]>(requests).subscribe({
      next: newCharacters => {
        this.characterInfos = newCharacters;
        this.selectedCharacterID = newCharacters[0].id;
      },
    });
  }

  /**
   * @description Assigns select option to variable
   * @param {Event} event
   * @returns {void}
   */
  onCharacterChange(event: Event): void {
    const selectedElement = event.target as HTMLSelectElement;
    this.selectedCharacterID = Number(selectedElement.value);
  }
}

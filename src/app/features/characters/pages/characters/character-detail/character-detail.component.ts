import { Component } from '@angular/core';
import { CharacterService } from '../../../services/characters.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ICharacterDetail } from '../../../../../models/character/character-detail.interface';
import { CommonModule } from '@angular/common';
import { IEpisodeDetail } from '../../../../../models/episode/episode-detail.interface';
import { forkJoin } from 'rxjs';
import { EpisodeService } from '../../../../episodes/services/episodes.service';

@Component({
  selector: 'app-character-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './character-detail.component.html',
  styleUrl: './character-detail.component.css',
})
export class CharacterDetailComponent {
  constructor(
    private characterService: CharacterService,
    private episodeService: EpisodeService,
    private route: ActivatedRoute
  ) {}

  protected routeID: string = '';
  protected characterDetails: ICharacterDetail | undefined;
  protected characterExists: boolean = false;
  protected episodeInfos: IEpisodeDetail[] = [];
  protected selectedEpisodeID: number | undefined;

  ngOnInit(): void {
    this.route.params.subscribe(param => (this.routeID = param['id']));
    this.onLoadCharacterDetails();
  }

  onLoadCharacterDetails() {
    this.characterService
      .onGetCharacterDetails(Number(this.routeID))
      .subscribe({
        next: data => {
          this.characterDetails = data;
          this.characterExists = true;
          this.onRetrieveEpisodes();
        },
        error: () => {
          this.characterDetails = undefined;
          this.characterExists = false;
        },
      });
  }

  onRetrieveEpisodes() {
    const episodeIDs = this.characterDetails?.episode.map(url =>
      url.split('/').pop()
    );

    const requests = episodeIDs!.map(id =>
      this.episodeService.onGetEpisodeDetails(Number(id))
    );

    /** Assign residents to completed observables */
    forkJoin<IEpisodeDetail[]>(requests).subscribe({
      next: newEpisodes => {
        this.episodeInfos = newEpisodes;
        this.selectedEpisodeID = newEpisodes[0].id;
      },
    });
  }

  onEpisodeChange(event: Event) {
    const selectedElement = event.target as HTMLSelectElement;
    this.selectedEpisodeID = Number(selectedElement.value);
  }
}

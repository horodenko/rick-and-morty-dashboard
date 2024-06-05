import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LocationService } from '../../../services/locations.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ILocationDetail } from '../../../../../models/location/location-detail.interface';
import { CharacterService } from '../../../../characters/services/characters.service';
import { ICharacterDetail } from '../../../../../models/character/character-detail.interface';
import { forkJoin } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-location-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './location-detail.component.html',
  styleUrl: './location-detail.component.css',
})
export class LocationDetailComponent {
  constructor(
    private locationService: LocationService,
    private characterService: CharacterService,
    private route: ActivatedRoute
  ) {}

  protected routeID: string = '';
  protected locationDetails: ILocationDetail | undefined;
  protected locationExists: boolean = false;
  protected residentsInfos: ICharacterDetail[] = [];
  protected selectedResidentID: number | undefined;

  ngOnInit(): void {
    this.route.params.subscribe(params => (this.routeID = params['id']));
    this.onLoadLocationDetails();
  }

  onLoadLocationDetails() {
    this.locationService.onGetLocationDetails(Number(this.routeID)).subscribe({
      next: data => {
        this.locationDetails = data;
        this.locationExists = true;
        this.onRetrieveResidents();
      },
      error: () => {
        this.locationDetails = undefined;
        this.locationExists = false;
      },
    });
  }

  onRetrieveResidents() {
    const residentIDs = this.locationDetails?.residents.map(url =>
      url.split('/').pop()
    );

    const requests = residentIDs!.map(id =>
      this.characterService.onGetCharacterDetails(Number(id))
    );

    /** Assign residents to completed observables */
    forkJoin<ICharacterDetail[]>(requests).subscribe({
      next: newResidents => {
        this.residentsInfos = newResidents;
        this.selectedResidentID = newResidents[0].id;
      },
    });
  }

  onResidentChange(event: Event) {
    const selectedElement = event.target as HTMLSelectElement;
    this.selectedResidentID = Number(selectedElement.value);
    console.log('Selected Resident ID:', this.selectedResidentID);
  }
}

import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home.component';
import { LocationsComponent } from './features/locations/pages/locations/locations.component';
import { CharactersComponent } from './features/characters/pages/characters/characters.component';
import { EpisodesComponent } from './features/episodes/pages/episodes/episodes.component';
import { EpisodeDetailComponent } from './features/episodes/pages/episodes/episode-detail/episode-detail.component';
import { LocationDetailComponent } from './features/locations/pages/locations/location-detail/location-detail.component';
import { CharacterDetailComponent } from './features/characters/pages/characters/character-detail/character-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'characters/:id', component: CharacterDetailComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'locations/:id', component: LocationDetailComponent },
  { path: 'episodes', component: EpisodesComponent },
  { path: 'episodes/:id', component: EpisodeDetailComponent },
];

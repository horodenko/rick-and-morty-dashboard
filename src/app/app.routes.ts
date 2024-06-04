import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home.component';
import { LocationsComponent } from './features/locations/pages/locations/locations.component';
import { CharactersComponent } from './features/characters/pages/characters/characters.component';
import { EpisodesComponent } from './features/episodes/pages/episodes/episodes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'characters', component: CharactersComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'episodes', component: EpisodesComponent },
];

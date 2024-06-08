import { Routes } from '@angular/router';
import { LocationsComponent } from './features/locations/pages/locations/locations.component';
import { CharactersComponent } from './features/characters/pages/characters/characters.component';
import { EpisodesComponent } from './features/episodes/pages/episodes/episodes.component';
import { EpisodeDetailComponent } from './features/episodes/pages/episodes/episode-detail/episode-detail.component';
import { LocationDetailComponent } from './features/locations/pages/locations/location-detail/location-detail.component';
import { CharacterDetailComponent } from './features/characters/pages/characters/character-detail/character-detail.component';
import { LoginComponent } from './features/login/pages/login.component';
import { ProfileComponent } from './features/profile/pages/profile.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/characters',
  },
  {
    path: 'sign-in',
    component: LoginComponent,
  },
  {
    path: 'characters',
    component: CharactersComponent,
    canActivate: [authGuard],
  },
  { path: 'characters/:id', component: CharacterDetailComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'locations/:id', component: LocationDetailComponent },
  { path: 'episodes', component: EpisodesComponent },
  { path: 'episodes/:id', component: EpisodeDetailComponent },
  { path: 'user-profile', component: ProfileComponent },
];

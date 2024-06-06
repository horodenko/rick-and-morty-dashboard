import { ILocation } from '../location/location.interface';
import { ICharacter } from './character.interface';

export type ICharacterDetail = ICharacter & {
  origin: Pick<ILocation, 'name' | 'url'>;
  location: Pick<ILocation, 'name' | 'url'>;
  image: string;
  episode: string[];
};

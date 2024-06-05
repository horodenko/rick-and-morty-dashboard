import { ILocation } from './location.interface';

export type ILocationDetail = ILocation & {
  residents: string[];
};

import { IEpisode } from './episode.interface';

export type IEpisodeDetail = IEpisode & {
  characters: string[];
};

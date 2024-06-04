import { IPagination } from '../pagination/pagination.interface';

export interface IApiMain<T> {
  info: IPagination;
  results: T[];
}

export interface IPagination {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface IFetchData {
  name: string;
  pageIndex: number;
}

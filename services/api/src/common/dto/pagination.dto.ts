export class PaginationDto<T> {
  constructor(items: T[], page: number, take: number, totalItems: number) {
    this.items = items;
    this.page = page;
    this.take = take;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(totalItems / take);
    this.isFinalPage = this.page === this.totalPages;
  }

  items: T[];
  page: number;
  take: number;
  totalItems: number;
  totalPages: number;
  isFinalPage: boolean;
}

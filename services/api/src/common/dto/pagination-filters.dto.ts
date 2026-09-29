import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationFiltersDto {
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  page: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}

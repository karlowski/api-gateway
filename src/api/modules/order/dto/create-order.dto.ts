import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  total: number;

  @IsNotEmpty()
  @IsString()
  title: string;
}

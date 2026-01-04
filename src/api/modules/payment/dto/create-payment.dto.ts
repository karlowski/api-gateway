import { IsNumber, IsOptional, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsOptional()
  @IsNumber()
  orderId: number;
}

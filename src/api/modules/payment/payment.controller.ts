import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../../common/guards/auth.guard';
import { BaseResponseDto } from '../../common/dto/base-response.dto';
import { Payment } from '../../../lib/database/entities/payment.entity';

@UseGuards(JwtAuthGuard)
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  @HttpCode(200)
  public async create(
    @Body() createPaymentDto: CreatePaymentDto
  ): Promise<BaseResponseDto<Payment>> {
    return this.paymentService.create(createPaymentDto);
  }
}

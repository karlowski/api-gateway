import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentProcessorService } from './payment-processor.service';
import { CreatePaymentContract } from '@app/lib';

@Controller()
export class PaymentProcessorController {
  constructor(private readonly paymentService: PaymentProcessorService) {}

  @MessagePattern('createPayment')
  create(@Payload() createPaymentDto: CreatePaymentContract) {
    return this.paymentService.create(createPaymentDto);
  }
}

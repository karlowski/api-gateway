import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

import { CreatePaymentContract, MessagePatternEnum, MessageQueueEnum, RetryLimiter } from '@app/lib';
import { PaymentProcessorService } from './payment-processor.service';

@Controller()
export class PaymentProcessorController {
  constructor(
    private readonly paymentService: PaymentProcessorService
  ) {}

  @MessagePattern(MessagePatternEnum.PAYMENT_CREATE)
  @RetryLimiter(MessageQueueEnum.PAYMENT, 3)
  create(
    @Ctx() context: RmqContext,
    @Payload() payload: CreatePaymentContract,
  ) {
    return this.paymentService.create(context, payload);
  }
}

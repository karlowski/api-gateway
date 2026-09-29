import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

import { OrderProcessorService } from './order-processor.service';
import { CreateOrderContract, CancelOrderContract, MessagePatternEnum } from '@app/lib';

@Controller()
export class OrderProcessorController {
  constructor(private readonly orderService: OrderProcessorService) {}

  @MessagePattern(MessagePatternEnum.ORDER_CREATE)
  create(
    @Ctx() context: RmqContext,
    @Payload() payload: CreateOrderContract,
  ) {
    console.log('HERE');
    return this.orderService.create(context, payload);
  }

  @MessagePattern(MessagePatternEnum.ORDER_CANCEL)
  remove(
    @Ctx() context: RmqContext,
    @Payload() payload: CancelOrderContract,
  ) {
    return this.orderService.cancel(context, payload);
  }
}

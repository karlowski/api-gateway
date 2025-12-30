import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

import { OrderProcessorService } from './order-processor.service';
import { CreateOrderContract } from '../../../lib/message-broker/contracts/order/create-order.contract';
import { CancelOrderContract } from '../../../lib/message-broker/contracts/order/cancel-order.contract';
import { MessagePatternEnum } from '../../../lib/message-broker/enums/message-pattern.enum';

@Controller()
export class OrderProcessorController {
  constructor(private readonly orderService: OrderProcessorService) {}

  @MessagePattern(MessagePatternEnum.ORDER_CREATE)
  create(
    @Ctx() context: RmqContext,
    @Payload() payload: CreateOrderContract,
  ) {
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

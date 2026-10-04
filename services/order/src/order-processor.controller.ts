import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';

import { OrderProcessorService } from './order-processor.service';
import { CreateOrderContract, UpdateOrderStatusContract, MessagePatternEnum, RetryLimiter, MessageQueueEnum, OrderStatusEnum } from '@app/lib';

@Controller()
export class OrderProcessorController {
  constructor(private readonly orderService: OrderProcessorService) {}

  @MessagePattern(MessagePatternEnum.ORDER_CREATE)
  @RetryLimiter(MessageQueueEnum.ORDER, 3)
  create(
    @Ctx() context: RmqContext,
    @Payload() payload: CreateOrderContract,
  ) {
    return this.orderService.create(context, payload);
  }
  
  @MessagePattern(MessagePatternEnum.ORDER_CANCEL)
  @RetryLimiter(MessageQueueEnum.ORDER, 3)
  remove(
    @Ctx() context: RmqContext,
    @Payload() payload: UpdateOrderStatusContract,
  ) {
    return this.orderService.updateStatus(context, payload, OrderStatusEnum.CANCELLED);
  }

  @MessagePattern(MessagePatternEnum.ORDER_PAYMENT_CONFIRMED)
  @RetryLimiter(MessageQueueEnum.ORDER, 3)
  confirm(
    @Ctx() context: RmqContext,
    @Payload() payload: UpdateOrderStatusContract,
  ) {
    return this.orderService.updateStatus(context, payload, OrderStatusEnum.CONFIRMED);
  }

  @MessagePattern(MessagePatternEnum.ORDER_PAYMENT_REJECTED)
  @RetryLimiter(MessageQueueEnum.ORDER, 3)
  transferToPending(
    @Ctx() context: RmqContext,
    @Payload() payload: UpdateOrderStatusContract,
  ) {
    return this.orderService.updateStatus(context, payload, OrderStatusEnum.PENDING);
  }
}

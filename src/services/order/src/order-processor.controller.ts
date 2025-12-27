import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { OrderProcessorService } from './order-processor.service';
import { CreateOrderContract } from '../../../lib/message-broker/contracts/order/create-order.contract';

@Controller()
export class OrderProcessorController {
  constructor(private readonly orderService: OrderProcessorService) {}

  @MessagePattern('createOrder')
  create(@Payload() createOrderDto: CreateOrderContract) {
    return this.orderService.create(createOrderDto);
  }

  @MessagePattern('removeOrder')
  remove(@Payload() id: number) {
    return this.orderService.remove(id);
  }
}

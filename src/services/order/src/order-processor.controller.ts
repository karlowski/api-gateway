import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrderProcessorService } from './order-processor.service';
import { CreateOrderContract } from '../../../lib/message-broker/contracts/order/create-order.contract';
import { UpdateOrderContract } from '../../../lib/message-broker/contracts/order/update-order.contract';

@Controller()
export class OrderProcessorController {
  constructor(private readonly orderService: OrderProcessorService) {}

  @MessagePattern('createOrder')
  create(@Payload() createOrderDto: CreateOrderContract) {
    return this.orderService.create(createOrderDto);
  }

  @MessagePattern('updateOrder')
  update(@Payload() updateOrderDto: UpdateOrderContract) {
    return this.orderService.update(updateOrderDto.id, updateOrderDto);
  }

  @MessagePattern('removeOrder')
  remove(@Payload() id: number) {
    return this.orderService.remove(id);
  }
}

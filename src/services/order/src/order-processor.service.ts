import { Injectable } from '@nestjs/common';
import { CreateOrderContract } from '../../../lib/message-broker/contracts/order/create-order.contract';
import { UpdateOrderContract } from '../../../lib/message-broker/contracts/order/update-order.contract';

@Injectable()
export class OrderProcessorService {
  create(createOrderDto: CreateOrderContract) {
    return 'This action adds a new order';
  }

  update(id: number, updateOrderDto: UpdateOrderContract) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

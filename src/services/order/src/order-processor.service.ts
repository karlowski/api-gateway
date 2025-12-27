import { Injectable } from '@nestjs/common';

import { CreateOrderContract } from '../../../lib/message-broker/contracts/order/create-order.contract';

@Injectable()
export class OrderProcessorService {
  create(createOrderDto: CreateOrderContract) {
    return 'This action adds a new order';
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

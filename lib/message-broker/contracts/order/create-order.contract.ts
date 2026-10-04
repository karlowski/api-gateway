import { Order } from '../../../database/entities/order.entity';

export class CreateOrderContract {
  constructor(data: Order) {
    this.orderId = data.id;
    this.total = data.total;
  }

  total: string;
  orderId: number;
}

import { CreateOrderContract } from '../order/create-order.contract';

export class CreatePaymentContract {
  constructor(data: CreateOrderContract) {
    this.orderId = data.orderId;
    this.total = data.total;
  }

  total: string;
  orderId: number;
}

import { Order } from '../../../database/entities/order.entity';

export class CreateOrderContract {
  constructor(data: Order) {
    return { ...data }
  }
}

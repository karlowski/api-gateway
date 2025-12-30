import { Order } from '../../../../lib/database/entities/order.entity';

export class CancelOrderContract {
  constructor(data: Order) {
    return { ...data }
  }
}

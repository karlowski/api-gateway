import { CreateOrderDto } from '../../../../api/modules/order/dto/create-order.dto';

export class CreateOrderContract {
  constructor(data: CreateOrderDto) {
    return { ...data }
  }
}

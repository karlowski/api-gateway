import { UpdateOrderDto } from '../../../../api/modules/order/dto/update-order.dto';

export class UpdateOrderContract {
  constructor(id: number, data: UpdateOrderDto) {
    return { id, ...data }
  }

  id: number;
}

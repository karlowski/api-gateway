import { CreatePaymentDto } from '../../../../api/modules/payment/dto/create-payment.dto';

export class CreatePaymentContract {
  constructor(data: CreatePaymentDto) {
    return { ...data }
  }

  amount: number;
  orderId: number;
}

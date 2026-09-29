export class CreatePaymentContract {
  constructor(data: CreatePaymentContract) {
    return { ...data }
  }

  amount: number;
  orderId: number;
}

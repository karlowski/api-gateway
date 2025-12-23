import { Injectable } from '@nestjs/common';
import { CreatePaymentContract } from '../../../lib/message-broker/contracts/payment/create-payment.contact';

@Injectable()
export class PaymentProcessorService {
  public async create(createPaymentDto: CreatePaymentContract) {
    return 'This action adds a new payment';
  }
}

import { Injectable } from '@nestjs/common';
import { CreatePaymentContract } from '@app/lib';

@Injectable()
export class PaymentProcessorService {
  public async create(createPaymentDto: CreatePaymentContract) {
    return 'This action adds a new payment';
  }
}

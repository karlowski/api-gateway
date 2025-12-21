import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ClientProxyTokenEnum } from '../../common/enums/client-proxy-token.enum';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(ClientProxyTokenEnum.PAYMENT_PUBLISHER)
    private readonly clientProxy: ClientProxy
  ) { }

  public async create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
  }

  public async find() {
    return `This action returns all payment`;
  }

  public async findOne(id: number) {
    return `This action returns a #${id} payment`;
  }
}

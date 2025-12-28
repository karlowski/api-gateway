import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { ClientProxyTokenEnum } from '../../common/enums/client-proxy-token.enum';
import { BaseResponseDto } from '../../common/dto/base-response.dto';
import { Payment } from '../../../lib/database/entities/payment.entity';
import { Order } from '../../../lib/database/entities/order.entity';
import { MessagePatternEnum } from '../../../lib/message-broker/enums/message-pattern.enum';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(ClientProxyTokenEnum.PAYMENT_PUBLISHER)
    private readonly clientProxy: ClientProxy,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) { }

  public async create(dto: CreatePaymentDto): Promise<BaseResponseDto<Payment>> {
    const { orderId, amount } = dto;

    const order = await this.orderRepository.createQueryBuilder('order')
      .where('order.id = :id', { id: orderId })
      .andWhere('order.paymentId IS NULL')
      .getOne();
    if (!order) {
      throw new NotFoundException('Order for a payment was not found');
    }

    firstValueFrom(
      this.clientProxy.send(MessagePatternEnum.PAYMENT_CREATE, {
        amount,
        order,
      })
    );

    return {
      message: 'Payment process is being initiated successfully',
    };
  }
}

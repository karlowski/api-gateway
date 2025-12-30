import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqContext } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderContract } from '../../../lib/message-broker/contracts/order/create-order.contract';
import { MessagePatternEnum } from '../../../lib/message-broker/enums/message-pattern.enum';
import { CreatePaymentContract } from '../../../lib/message-broker/contracts/payment/create-payment.contact';
import { CancelOrderContract } from '../../../lib/message-broker/contracts/order/cancel-order.contract';
import { Order } from '../../../lib/database/entities/order.entity';
import { ClientProxyTokenEnum } from '../../../api/common/enums/client-proxy-token.enum'; // TODO: move from API
import { OrderStatusEnum } from '../../../lib/domain/enums/order-status.enum';

@Injectable()
export class OrderProcessorService {
  constructor(
    @Inject(ClientProxyTokenEnum.PAYMENT_PUBLISHER)
    private readonly paymentClient: ClientProxy,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) { }

  public async create(context: RmqContext, payload: CreateOrderContract): Promise<void> {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      // make some side effects and calculations
      for (let i = 0; i < 10000; i++) { }

      this.paymentClient.send<CreatePaymentContract>(MessagePatternEnum.PAYMENT_CREATE, {
        ...payload
      });
    } catch (error) {
      // TODO: logging
      channel.nack(message, false, true);
    }

    channel.ack(message);
  }

  public async cancel(context: RmqContext, payload: CancelOrderContract) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      // make some side effects and calculations
      for (let i = 0; i < 10000; i++) { }

      await this.orderRepository.save({
        ...payload,
        status: OrderStatusEnum.CANCELLED,
      })

      // TODO: cancel pending payments..?
    } catch (error) {
      // TODO: logging
      channel.nack(message, false, true);
    }

    channel.ack(message);
  }
}

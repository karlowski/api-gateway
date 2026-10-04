import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqContext } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { DataSource, Repository } from 'typeorm';

import { 
  CreateOrderContract, 
  MessagePatternEnum, 
  CreatePaymentContract, 
  UpdateOrderStatusContract, 
  ClientProxyTokenEnum, 
  OrderStatusEnum, 
  buildRmqRecord, 
  derivedMessageId, 
  getMessageId
} from '@app/lib';
import { Order } from '@app/lib/database';

@Injectable()
export class OrderProcessorService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject(ClientProxyTokenEnum.PAYMENT_PUBLISHER)
    private readonly paymentClient: ClientProxy,
  ) { }

  public async create(
    context: RmqContext,
    payload: CreateOrderContract,
  ): Promise<void> {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      // make some side effects and calculations
      for (let i = 0; i < 10000; i++) {}

      await lastValueFrom(this.paymentClient.emit<CreatePaymentContract>(
        MessagePatternEnum.PAYMENT_CREATE,
        buildRmqRecord(payload, derivedMessageId(getMessageId(context), MessagePatternEnum.PAYMENT_CREATE))
      ));
    } catch (error) {
      // TODO: logging
      return channel.nack(message, false, false);
    }

    return channel.ack(message);
  }

  async updateStatus(context: RmqContext, payload: UpdateOrderStatusContract, status: OrderStatusEnum) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    try {
      // make some side effects and calculations
      for (let i = 0; i < 10000; i++) {}

      const order = await this.orderRepository.findOneBy({ id: payload.orderId });
      await this.orderRepository.save({
        ...order,
        ...payload,
        status,
        statusUpdatedAt: new Date(),
      });

      // TODO: cancel pending payments..?
    } catch (error) {
      // TODO: logging
      return channel.nack(message, false, false);
    }

    return channel.ack(message);
  }
}

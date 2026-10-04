import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqContext } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { ClientProxyTokenEnum, CreatePaymentContract, getMessageId, MessagePatternEnum, PaymentStatusEnum } from '@app/lib';
import { Payment, processMessageOnce } from '@app/lib/database';

@Injectable()
export class PaymentProcessorService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @Inject(ClientProxyTokenEnum.ORDER_PUBLISHER)
    private readonly orderClient: ClientProxy,
  ) { }

  public async create(
    context: RmqContext,
    createPaymentDto: CreatePaymentContract
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    const { total, orderId } = createPaymentDto;
    const isLastAttempt = message.properties.headers?.['x-last-attempt'] === true;

    try {
      await processMessageOnce(this.dataSource, 'payment', getMessageId(context), async (entityManager: EntityManager) => {
        const paymentRepository = entityManager.getRepository(Payment);
        let payment = await paymentRepository.findOneBy({ orderId });

        if (!payment) {
          payment = await paymentRepository.save({
            orderId,
            total: total.toString(),
            status: PaymentStatusEnum.PENDING
          });
        }
        if (payment.status !== PaymentStatusEnum.PENDING) {
          return;
        }

        try {
          // make some side effects and calculations
          for (let i = 0; i < 100000; i++) { }

          if (Math.random() < 0.5) {
            throw new Error('Payment is failed');
          } else {
            await paymentRepository.save({
              ...payment,
              status: PaymentStatusEnum.CONFIRMED,
              statusUpdatedAt: new Date(),
            });
          }
        } catch (error) {
          if (!isLastAttempt) {
            throw error;
          }
          await paymentRepository.save({
            ...payment,
            status: PaymentStatusEnum.REJECTED,
            statusUpdatedAt: new Date(),
          });
        }
      });

      const payment = await this.paymentRepository.findOneBy({ orderId });
      await lastValueFrom(this.orderClient.emit<{ orderId: number }>(
        payment?.status === PaymentStatusEnum.CONFIRMED
          ? MessagePatternEnum.ORDER_PAYMENT_CONFIRMED
          : MessagePatternEnum.ORDER_PAYMENT_REJECTED,
        {
          orderId,
        },
      ));
    } catch (error) {
      return channel.nack(message, false, false);
    }



    return channel.ack(message);
  }
}

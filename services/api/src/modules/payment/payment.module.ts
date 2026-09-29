import { Module } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ClientProxyTokenEnum, MessageQueueEnum, RmqConfigService, RmqModule } from '@app/lib';
import { Order, Payment } from '@app/lib/database';

@Module({
  controllers: [PaymentController],
  imports: [TypeOrmModule.forFeature([Order, Payment]), RmqModule],
  providers: [
    PaymentService,
    {
      provide: ClientProxyTokenEnum.PAYMENT_PUBLISHER,
      useFactory: (rmq: RmqConfigService): ClientProxy =>
        ClientProxyFactory.create(
          rmq.createConfig(MessageQueueEnum.PAYMENT, true),
        ),
      inject: [RmqConfigService],
    },
  ],
})
export class PaymentModule {}

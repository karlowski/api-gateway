import { Module } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ClientProxyTokenEnum } from '../../common/enums/client-proxy-token.enum';
import { MessageQueueEnum } from '../../../lib/message-broker/enums/message-queue.enum';
import { RmqConfigService } from '../../../lib/message-broker/modules/rmq/rmq-config.service';
import { RmqModule } from '../../../lib/message-broker/modules/rmq/rmq.module';
import { Order } from '../../../lib/database/entities/order.entity';
import { Payment } from '../../../lib/database/entities/payment.entity';

@Module({
  controllers: [PaymentController],
  imports: [
    TypeOrmModule.forFeature([Order, Payment]),
    RmqModule,
  ],
  providers: [
    PaymentService,
    {
      provide: ClientProxyTokenEnum.PAYMENT_PUBLISHER,
      useFactory: (rmq: RmqConfigService): ClientProxy =>
        ClientProxyFactory.create(
          rmq.createConfig(MessageQueueEnum.PAYMENT)
        ),
      inject: [RmqConfigService],
    }
  ],
})
export class PaymentModule { }

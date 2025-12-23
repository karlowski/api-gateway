import { Module } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ClientProxyTokenEnum } from '../../common/enums/client-proxy-token.enum';
import { MessageQueueEnum } from '../../../lib/message-broker/enums/message-queue.enum';
import { RmqConfigService } from '../../../lib/message-broker/modules/rmq/rmq-config.service';
import { RmqModule } from '../../../lib/message-broker/modules/rmq/rmq.module';

@Module({
  controllers: [PaymentController],
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
  imports: [RmqModule]
})
export class PaymentModule { }

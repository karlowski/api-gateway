import { Module } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientProxyTokenEnum } from '../../common/enums/client-proxy-token.enum';
import { MessageQueueEnum } from '../../../lib/message-broker/enums/message-queue.enum';
import { RmqConfigService } from '../../../lib/message-broker/modules/rmq/rmq-config.service';
import { RmqModule } from '../../../lib/message-broker/modules/rmq/rmq.module';

@Module({
  controllers: [OrderController],
  
  providers: [
    OrderService,
    {
      provide: ClientProxyTokenEnum.ORDER_PUBLISHER,
      useFactory: (rmq: RmqConfigService): ClientProxy => 
        ClientProxyFactory.create(
          rmq.createConfig(MessageQueueEnum.ORDER)
        ),
      inject: [RmqConfigService],
    }
  ],
  imports: [RmqModule]
})
export class OrderModule { }

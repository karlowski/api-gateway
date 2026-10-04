import { Module } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientProxyTokenEnum, MessageQueueEnum, RmqConfigService, RmqModule } from '@app/lib';
import { Order } from '@app/lib/database';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([Order]), RmqModule],
  providers: [
    OrderService,
    {
      provide: ClientProxyTokenEnum.ORDER_PUBLISHER,
      useFactory: (rmq: RmqConfigService): ClientProxy =>
        ClientProxyFactory.create(
          rmq.createConfig(MessageQueueEnum.ORDER, true),
        ),
      inject: [RmqConfigService],
    },
  ],
})
export class OrderModule {}

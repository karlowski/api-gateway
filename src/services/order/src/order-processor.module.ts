import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderProcessorService } from './order-processor.service';
import { OrderProcessorController } from './order-processor.controller';
import { RmqModule } from '../../../lib/message-broker/modules/rmq/rmq.module';
import { ClientProxyTokenEnum } from '../../../api/common/enums/client-proxy-token.enum'; // TODO: move from API
import { RmqConfigService } from '../../../lib/message-broker/modules/rmq/rmq-config.service';
import { MessageQueueEnum } from '../../../lib/message-broker/enums/message-queue.enum';
import { Order } from '../../../lib/database/entities/order.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../../.env',
    }),
    RmqModule,
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderProcessorController],
  providers: [
    OrderProcessorService,
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
export class OrderProcessorModule { }

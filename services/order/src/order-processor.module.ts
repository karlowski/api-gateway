import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderProcessorService } from './order-processor.service';
import { OrderProcessorController } from './order-processor.controller';
import { RmqModule, ClientProxyTokenEnum, RmqConfigService, MessageQueueEnum, retryName } from '@app/lib';
import { Order, databaseModule } from '@app/lib/database';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    RmqModule,
    databaseModule,
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [OrderProcessorController],
  providers: [
    OrderProcessorService,
    {
      provide: ClientProxyTokenEnum.PAYMENT_PUBLISHER,
      useFactory: (rmq: RmqConfigService): ClientProxy =>
        ClientProxyFactory.create(
          rmq.createConfig(MessageQueueEnum.PAYMENT, true),
        ),
      inject: [RmqConfigService],
    }
  ],
})
export class OrderProcessorModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientProxyTokenEnum, MessageQueueEnum, RmqConfigService, RmqModule } from '@app/lib';
import { Payment, databaseModule } from '@app/lib/database';
import { PaymentProcessorService } from './payment-processor.service';
import { PaymentProcessorController } from './payment-processor.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    RmqModule,
    databaseModule,
    TypeOrmModule.forFeature([Payment]),
  ],
  controllers: [PaymentProcessorController],
  providers: [
    PaymentProcessorService,
    {
      provide: ClientProxyTokenEnum.ORDER_PUBLISHER,
      useFactory: (rmq: RmqConfigService): ClientProxy =>
        ClientProxyFactory.create(
          rmq.createConfig(MessageQueueEnum.ORDER, true),
        ),
      inject: [RmqConfigService],
    }
  ],
})
export class PaymentProcessorModule {}

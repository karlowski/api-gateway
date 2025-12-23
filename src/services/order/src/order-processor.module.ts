import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderProcessorService } from './order-processor.service';
import { OrderProcessorController } from './order-processor.controller';
import { RmqModule } from '../../../lib/message-broker/modules/rmq/rmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../../.env',
    }),
    RmqModule,
  ],
  controllers: [OrderProcessorController],
  providers: [OrderProcessorService],
})
export class OrderProcessorModule { }

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OrderProcessorService } from './order-processor.service';
import { OrderProcessorController } from './order-processor.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../../.env',
    }),
  ],
  controllers: [OrderProcessorController],
  providers: [OrderProcessorService],
})
export class OrderProcessorModule { }

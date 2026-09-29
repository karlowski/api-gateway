import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaymentProcessorService } from './payment-processor.service';
import { PaymentProcessorController } from './payment-processor.controller';
import { RmqModule } from '@app/lib';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),
    RmqModule,
  ],
  controllers: [PaymentProcessorController],
  providers: [PaymentProcessorService],
})
export class PaymentProcessorModule {}

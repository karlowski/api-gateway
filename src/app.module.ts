import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './api/modules/order/order.module';
import { PaymentModule } from './api/modules/payment/payment.module';
import { databaseModule } from './lib/database/datasource';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    databaseModule,
    OrderModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientProxyTokenEnum } from '../../common/enums/client-proxy-token.enum';
import { MessageQueueEnum } from '../../../lib/message-broker/enums/message-queue.enum';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: ClientProxyTokenEnum.ORDER_PUBLISHER,
      useFactory: (configService: ConfigService): ClientProxy => {
        const user = configService.get<string>('RMQ_USER');
        const password = configService.get<string>('RMQ_PASSWORD');
        const host = configService.get<string>('RMQ_HOST');;
        const port = configService.get<number>('RMQ_AMQP_PORT');
        
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}:${port}`],
            queue: MessageQueueEnum.ORDER,
            prefetchCount: 1,
            persistent: true,
            noAck: true,
            queueOptions: {
              durable: true,
            },
            socketOptions: {
              heartbeatIntervalInSeconds: 60,
              reconnectTimeInSeconds: 5,
            },
          },
        });
      },
      inject: [ConfigService],
    }
  ],
})
export class OrderModule { }

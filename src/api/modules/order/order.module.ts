import { Module } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ClientProxyTokenEnum } from '../../common/enums/client-proxy-token.enum';
import { MessageQueueEnum } from '../../../lib/message-broker/enums/message-queue.enum';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: ClientProxyTokenEnum.ORDER_PUBLISHER,
      useFactory: (): ClientProxy => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://rabbitmq:5672`],
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
    }
  ],
})
export class OrderModule { }

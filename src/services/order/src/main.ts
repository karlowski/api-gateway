import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AsyncMicroserviceOptions, Transport } from '@nestjs/microservices';
import { OrderProcessorModule } from './order-processor.module';
import { MessageQueueEnum } from '../../../lib/message-broker/enums/message-queue.enum';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    OrderProcessorModule,
    {
      useFactory: (configService: ConfigService) => {
        const user = configService.get<string>('RMQ_USER');
        const password = configService.get<string>('RMQ_PASSWORD');
        const host = configService.get<string>('RMQ_HOST');;
        const port = configService.get<number>('RMQ_AMQP_PORT');

        return {
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${user}:${password}@${host}:${port}`],
            queue: MessageQueueEnum.ORDER,
            queueOptions: {
              durable: true
            },
          }
        }
      },
      inject: [ConfigService],
    },
  );
  await app.listen();
}
bootstrap();

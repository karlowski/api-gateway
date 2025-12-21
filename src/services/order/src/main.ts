import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { OrderProcessorModule } from './order-processor.module';
import { MessageQueueEnum } from '../../../lib/message-broker/enums/message-queue.enum';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<RmqOptions>(OrderProcessorModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: MessageQueueEnum.ORDER,
      queueOptions: {
        durable: true
      },
    }
  });

  await app.listen();
}
bootstrap();

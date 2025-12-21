import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { PaymentProcessorModule } from './payment-processor.module';
import { MessageQueueEnum } from '../../../lib/message-broker/enums/message-queue.enum';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<RmqOptions>(PaymentProcessorModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: MessageQueueEnum.PAYMENT,
      queueOptions: {
        durable: true
      },
    }
  });
  await app.listen();
}
bootstrap();

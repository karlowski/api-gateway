import { NestFactory } from '@nestjs/core';
import { AsyncMicroserviceOptions } from '@nestjs/microservices';
import { PaymentProcessorModule } from './payment-processor.module';
import { MessageQueueEnum } from '../../../lib/message-broker/enums/message-queue.enum';
import { RmqConfigService } from '../../../lib/message-broker/modules/rmq/rmq-config.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    PaymentProcessorModule,
    {
      useFactory: (rmq: RmqConfigService) => rmq.createMicroserviceConfig(MessageQueueEnum.PAYMENT),
      inject: [RmqConfigService],
    },
  );
  await app.listen();
}
bootstrap();

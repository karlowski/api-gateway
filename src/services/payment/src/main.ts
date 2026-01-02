import { NestFactory } from '@nestjs/core';
import { AsyncMicroserviceOptions } from '@nestjs/microservices';

import { PaymentProcessorModule } from './payment-processor.module';
import { MessageQueueEnum } from '../../../lib/message-broker/enums/message-queue.enum';
import { RmqConfigService } from '../../../lib/message-broker/modules/rmq/rmq-config.service';

async function bootstrap() {
  const ctx = await NestFactory.createApplicationContext(PaymentProcessorModule);
  const rmq = ctx.get(RmqConfigService);

  await rmq.initDeadLetterQueue(MessageQueueEnum.PAYMENT);
  await rmq.initRetryQueue(MessageQueueEnum.PAYMENT)
  await ctx.close();

  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    PaymentProcessorModule,
    {
      useFactory: (rmq: RmqConfigService) => 
        rmq.createConfig(MessageQueueEnum.PAYMENT, {
          deadLetterRoutingKey: `${MessageQueueEnum.PAYMENT}.retry`
        }),
      inject: [RmqConfigService],
    },
  );
  await app.listen();
}
bootstrap();

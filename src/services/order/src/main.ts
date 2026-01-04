import { NestFactory } from '@nestjs/core';
import { AsyncMicroserviceOptions } from '@nestjs/microservices';

import { OrderProcessorModule } from './order-processor.module';
import { dlxName, MessageQueueEnum, retryName } from '../../../lib/message-broker/enums/message-queue.enum';
import { RmqConfigService } from '../../../lib/message-broker/modules/rmq/serivces/rmq-config.service';

async function bootstrap() {
  // const ctx = await NestFactory.createApplicationContext(OrderProcessorModule);
  
  // await ctx.close();

  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    OrderProcessorModule,
    {
      useFactory: (rmq: RmqConfigService) => 
        rmq.createConfig(MessageQueueEnum.ORDER, false),
      inject: [RmqConfigService],
    },
  );

  const rmq = app.get(RmqConfigService);

  await rmq.initDeadLetterQueue(MessageQueueEnum.ORDER);
  await rmq.initRetryQueue(MessageQueueEnum.ORDER);
  
  await app.listen();
}
bootstrap();

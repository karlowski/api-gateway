import { NestFactory } from '@nestjs/core';
import { AsyncMicroserviceOptions } from '@nestjs/microservices';

import { OrderProcessorModule } from './order-processor.module';
import { MessageQueueEnum } from '../../../lib/message-broker/enums/message-queue.enum';
import { RmqConfigService } from '../../../lib/message-broker/modules/rmq/serivces/rmq-config.service';

async function bootstrap() {
  const ctx = await NestFactory.createApplicationContext(OrderProcessorModule);
  const rmq = ctx.get(RmqConfigService);

  await rmq.initDeadLetterQueue(MessageQueueEnum.ORDER);
  await ctx.close();

  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    OrderProcessorModule,
    {
      useFactory: (rmq: RmqConfigService) => 
        rmq.createConfig(MessageQueueEnum.ORDER, {
          deadLetterRoutingKey: MessageQueueEnum.ORDER
        }),
      inject: [RmqConfigService],
    },
  );
  
  await app.listen();
}
bootstrap();

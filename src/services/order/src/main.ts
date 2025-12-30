import { NestFactory } from '@nestjs/core';
import { AsyncMicroserviceOptions } from '@nestjs/microservices';

import { OrderProcessorModule } from './order-processor.module';
import { MessageQueueEnum } from '../../../lib/message-broker/enums/message-queue.enum';
import { RmqConfigService } from '../../../lib/message-broker/modules/rmq/rmq-config.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<AsyncMicroserviceOptions>(
    OrderProcessorModule,
    {
      useFactory: (rmq: RmqConfigService) => rmq.createConfig(MessageQueueEnum.ORDER),
      inject: [RmqConfigService],
    },
  );
  
  await app.listen();
}
bootstrap();

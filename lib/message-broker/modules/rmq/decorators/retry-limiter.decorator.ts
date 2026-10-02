import { RmqContext } from '@nestjs/microservices';

import { MessageQueueEnum } from '../../../enums/message-queue.enum';
import { publishToDlq } from '../../../utils/dlq';

export const RetryLimiter = (queue: MessageQueueEnum, limit: number) => {
  return (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const ctx = args.find(a => a instanceof RmqContext);
      if (!ctx) {
        return original.apply(this, args);
      }

      const channel = ctx.getChannelRef();
      const msg = ctx.getMessage();

      const deathHeader = msg.properties.headers?.['x-death'];
      const retryCount = deathHeader?.[0]?.count || 0;

      msg.properties.headers['x-last-attempt'] = retryCount === limit - 1;

      if (retryCount >= limit) {
        publishToDlq(channel, msg, queue);
        channel.ack(msg);

        // TODO:
        // notification, logging, etc...

        return;
      }

      return original.apply(this, args);
    };

    return descriptor;
  };
};


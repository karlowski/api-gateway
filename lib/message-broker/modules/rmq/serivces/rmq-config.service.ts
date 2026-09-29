import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport, RmqOptions } from '@nestjs/microservices';
import { AmqplibQueueOptions } from '@nestjs/microservices/external/rmq-url.interface';
import amqp from 'amqp-connection-manager';

import { dlqName, dlxName, mainName, MessageQueueEnum, retryName } from '../../../enums/message-queue.enum';

@Injectable()
export class RmqConfigService {
  constructor(
    private readonly configService: ConfigService
  ) { }

  private getUrl(): string {
    const user = this.configService.get<string>('RMQ_USER');
    const pass = this.configService.get<string>('RMQ_PASSWORD');
    const host = this.configService.get<string>('RMQ_HOST');
    const port = this.configService.get<number>('RMQ_AMQP_PORT');

    return `amqp://${user}:${pass}@${host}:${port}`;
  }

  public async initDeadLetterQueue(queue: MessageQueueEnum): Promise<void> {
    const dlx = dlxName(queue);
    const dlq = dlqName(queue);
    const main = mainName(queue);

    const connection = amqp.connect(this.getUrl());
    const channel = connection.createChannel();

    await channel.assertExchange(dlx, 'direct', { durable: true });
    await channel.assertQueue(dlq, { durable: true });
    await channel.bindQueue(dlq, dlx, main);
    await channel.close();

    await connection.close();
  }

  public async initRetryQueue(queue: MessageQueueEnum): Promise<void> {
    const dlx = dlxName(queue);
    const main = mainName(queue);
    const retry = retryName(queue);

    const connection = amqp.connect(this.getUrl());
    const channel = connection.createChannel();

    await channel.assertExchange(dlx, 'direct', { durable: true });
    await channel.assertQueue(retry, {
      durable: true,
      messageTtl: 3000,
      deadLetterExchange: '',
      deadLetterRoutingKey: main,
    });

    await channel.bindQueue(retry, dlx, 'retry');
    await channel.close();
    await connection.close();
  }

  public createConfig(
    queue: MessageQueueEnum, 
    noAck = false,  // TODO: find a way to make it better
    options: AmqplibQueueOptions = {}
  ): RmqOptions {
    const dlx = dlxName(queue);

    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.getUrl()],
        queue: mainName(queue),
        prefetchCount: 1,
        noAck,
        queueOptions: {
          durable: true,
          deadLetterExchange: dlx,
          deadLetterRoutingKey: retryName(queue),
          ...options,
        },
        socketOptions: {
          heartbeatIntervalInSeconds: 60,
          reconnectTimeInSeconds: 5,
        },
      },
    }
  }
}
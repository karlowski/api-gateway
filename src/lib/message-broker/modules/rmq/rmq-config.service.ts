import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport, RmqOptions } from '@nestjs/microservices';
import { MessageQueueEnum } from '../../enums/message-queue.enum';

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

  public createConfig(queue: MessageQueueEnum): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.getUrl()],
        queue,
        prefetchCount: 1,
        noAck: true,
        queueOptions: {
          durable: true,
        },
        socketOptions: {
          heartbeatIntervalInSeconds: 60,
          reconnectTimeInSeconds: 5,
        },
      },
    }
  }

  public createMicroserviceConfig(queue: MessageQueueEnum): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.getUrl()],
        queue,
        queueOptions: {
          durable: true,
        },
      },
    }
  }
}
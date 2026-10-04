import { randomUUID } from 'crypto';
import { RmqRecord, RmqRecordBuilder } from '@nestjs/microservices';

export const buildRmqRecord = <T>(data: T, messageId: string = randomUUID()): RmqRecord => 
    new RmqRecordBuilder(data).setOptions({ messageId }).build();
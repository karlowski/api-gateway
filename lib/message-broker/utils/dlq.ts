import { dlxName, mainName, MessageQueueEnum } from '../enums/message-queue.enum';

export const publishToDlq = (channel: any, message: Record<string, any>, queue: MessageQueueEnum) => {
  channel.publish(dlxName(queue), mainName(queue), message.content, { 
    headers: message.properties.headers 
  });
}

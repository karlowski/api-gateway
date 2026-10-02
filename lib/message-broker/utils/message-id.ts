import { RmqContext } from '@nestjs/microservices';

import { MessagePatternEnum } from '../enums/message-pattern.enum';

export const getMessageId = (ctx: RmqContext) => ctx.getMessage().properties.messageId;
export const derivedMessageId = (parentId: string, pattern: MessagePatternEnum) => `${parentId}:${pattern}`;

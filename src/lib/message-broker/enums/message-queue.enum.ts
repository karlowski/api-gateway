export enum MessageQueueEnum {
  ORDER = 'order_queue',
  PAYMENT = 'payment_queue',
  // TODO:
  // NOTIFICATION = 'notification_queue'
}

export const dlxName   = (q: MessageQueueEnum) => `${q}.dlx`;
export const dlqName   = (q: MessageQueueEnum) => `${q}.dlq`;

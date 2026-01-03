export enum MessageQueueEnum {
  ORDER = 'order',
  PAYMENT = 'payment',
  // TODO:
  // NOTIFICATION = 'notification'
}

export const dlxName   = (q: MessageQueueEnum) => `${q}.dlx`;
export const dlqName   = (q: MessageQueueEnum) => `${q}.dlq`;
export const retryName = (q: MessageQueueEnum) => `${q}.retry`;

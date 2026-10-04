export enum MessagePatternEnum {
  ORDER_CREATE = "order.create",
  ORDER_CANCEL = "order.cancel",
  ORDER_PAYMENT_CONFIRMED = "order.payment_confirmed",
  ORDER_PAYMENT_REJECTED = "order.payment_rejected",
  PAYMENT_CREATE = "payment.create"
  // TODO: messaging
  // ...
  // PAYMENT_COMPLETE,
  // PAYMENT_REJECT,
}

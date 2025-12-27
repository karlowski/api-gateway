import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  ManyToOne, 
  JoinColumn 
} from 'typeorm';

import { OrderStatusEnum } from '../../domain/enums/order-status.enum';
import { Payment } from './payment.entity';

@Entity('order_record')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: string;

  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2 
  })
  title: string;

  @Column({ 
    type: 'enum', 
    enum: OrderStatusEnum, 
    default: OrderStatusEnum.PENDING
  })
  status: OrderStatusEnum;

  @ManyToOne(() => Payment, { nullable: true })
  @JoinColumn({ name: 'payment_id' })
  payment?: Payment;

  @Column({ 
    name: 'payment_confirmed_at', 
    type: 'timestamp', 
    nullable: true
  })
  paymentConfirmedAt?: Date;

  @Column({ 
    name: 'cancelled_at', 
    type: 'timestamp', 
    nullable: true
  })
  cancelledAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

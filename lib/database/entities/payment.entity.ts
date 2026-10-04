import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  JoinColumn,
  OneToOne
} from 'typeorm';

import { PaymentStatusEnum } from '../../domain/enums/payment-status.enum';
import { Order } from './order.entity';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total: string;

  @Column({ 
    type: 'enum', 
    enum: PaymentStatusEnum, 
    default: PaymentStatusEnum.PENDING 
   })
  status: PaymentStatusEnum;

  @Column({ 
    name: 'order_id',
    nullable: true,
    select: false,
  })
  orderId: number;

@OneToOne(() => Order, (order) => order.payment, { nullable: true })
  @JoinColumn({ name: 'order_id' })
  order?: Order;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ 
    name: 'status_updated_at', 
    type: 'timestamp', 
    nullable: true 
  })
  statusUpdatedAt?: Date;
}

import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn,
  OneToOne
} from 'typeorm';

import { OrderStatusEnum } from '../../domain/enums/order-status.enum';
import { Payment } from './payment.entity';

@Entity('order_record')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ 
    type: 'decimal', 
    precision: 10, 
    scale: 2 
  })
  total: string;

  @Column({ 
    type: 'enum', 
    enum: OrderStatusEnum, 
    default: OrderStatusEnum.PENDING
  })
  status: OrderStatusEnum;

  @OneToOne(() => Payment, (payment) => payment.order)
  payment?: Payment;

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

import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';
import { PaymentStatusEnum } from '../../domain/enums/payment-status.enum';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sum: string;

  @Column({ 
    type: 'enum', 
    enum: PaymentStatusEnum, 
    default: PaymentStatusEnum.PENDING 
   })
  status: PaymentStatusEnum;

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

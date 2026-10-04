import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('processed_message')
export class ProcessedMessage {
  @PrimaryColumn()
  consumer: string;
  
  @PrimaryColumn({ name: 'message_id' })
  messageId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

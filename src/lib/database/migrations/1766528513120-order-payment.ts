import { MigrationInterface, QueryRunner } from 'typeorm';
import { OrderStatusEnum } from '../../domain/enums/order-status.enum';
import { PaymentStatusEnum } from '../../domain/enums/payment-status.enum';

export class OrderPayment1766528513120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`order_record\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`total\` DECIMAL(10,2) NOT NULL,
        \`status\` ENUM(
          '${OrderStatusEnum.PENDING}', 
          '${OrderStatusEnum.CANCELLED}', 
          '${OrderStatusEnum.IN_PROGRESS}', 
          '${OrderStatusEnum.COMPLETED}'
        ) NOT NULL DEFAULT '${OrderStatusEnum.PENDING}',
        \`payment_id\` INT NULL,
        \`payment_confirmed_at\` TIMESTAMP NULL DEFAULT NULL,
        \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;
    `);

    await queryRunner.query(`
      CREATE TABLE \`payment\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`sum\` DECIMAL(10,2) NOT NULL,
        \`status\` ENUM(
          '${PaymentStatusEnum.PENDING}', 
          '${PaymentStatusEnum.CONFIRMED}',
          '${PaymentStatusEnum.REJECTED}'
        ) NOT NULL DEFAULT '${PaymentStatusEnum.PENDING}',
        \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`status_updated_at\` TIMESTAMP NULL,
        PRIMARY KEY (\`id\`)                                         
      ) ENGINE=InnoDB;
    `);

    await queryRunner.query(
      `ALTER TABLE \`order_record\` ADD CONSTRAINT \`FK_order_payment_id\` FOREIGN KEY (\`payment_id\`) REFERENCES \`payment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`order_record\` DROP CONSTRAINT \`FK_order_payment_id\``);
    await queryRunner.query(`DROP TABLE \`payment\``);
    await queryRunner.query(`DROP TABLE \`order_record\``);
  }
}

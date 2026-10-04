import { MigrationInterface, QueryRunner } from 'typeorm';

import { OrderStatusEnum } from '../../domain/enums/order-status.enum';
import { PaymentStatusEnum } from '../../domain/enums/payment-status.enum';

export class OrderPayment1766528513120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`order_record\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`total\` DECIMAL(10,2) NOT NULL,
        \`title\` VARCHAR(255) NOT NULL,
        \`status\` ENUM(
          ${Object.values(OrderStatusEnum)
            .map(v => `'${v}'`)
            .join(', ')}
        ) NOT NULL DEFAULT '${OrderStatusEnum.PENDING}',
        \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`status_updated_at\` TIMESTAMP NULL,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB;
    `);

    await queryRunner.query(`
      CREATE TABLE \`payment\` (
        \`id\` INT NOT NULL AUTO_INCREMENT,
        \`total\` DECIMAL(10,2) NOT NULL,
        \`status\` ENUM(
          ${Object.values(PaymentStatusEnum)
            .map(v => `'${v}'`)
            .join(', ')}
        ) NOT NULL DEFAULT '${PaymentStatusEnum.PENDING}',
        \`order_id\` INT UNIQUE, 
        \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`status_updated_at\` TIMESTAMP NULL,
        PRIMARY KEY (\`id\`)                                         
      ) ENGINE=InnoDB;
    `);

    await queryRunner.query(
      `ALTER TABLE \`payment\` ADD CONSTRAINT \`FK_payment_order_id\` FOREIGN KEY (\`order_id\`) REFERENCES \`order_record\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`payment\` DROP CONSTRAINT \`FK_payment_order_id\``);
    await queryRunner.query(`DROP TABLE \`payment\``);
    await queryRunner.query(`DROP TABLE \`order_record\``);
  }
}

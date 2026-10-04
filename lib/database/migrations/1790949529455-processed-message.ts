import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProcessedMessage1790949529455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`processed_message\` (
        \`consumer\` VARCHAR(100) NOT NULL,
        \`message_id\` VARCHAR(128) NOT NULL,
        \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (consumer, message_id),
        KEY IDX_processed_message_created_at (created_at)
      ) ENGINE=InnoDB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`processed_message\``);
  }
}

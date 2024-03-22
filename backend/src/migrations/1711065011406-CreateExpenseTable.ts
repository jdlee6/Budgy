import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExpenseTable1711065011406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "expense" (
                "id" SERIAL PRIMARY KEY,
                "name" varchar NOT NULL,
                "amount" integer NOT NULL,
                "recurring" boolean NOT NULL,
                "userId" integer NOT NULL
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "expense"
        `);
  }
}

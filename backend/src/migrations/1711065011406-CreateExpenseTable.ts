import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExpenseTable1711065011406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "expense" (
                "id" SERIAL PRIMARY KEY,
                "name" varchar NOT NULL,
                "amount" real NOT NULL,
                "recurrence" boolean NOT NULL,
                "billingDate" date,
                "createdAt" TIMESTAMP,
                "updatedAt" TIMESTAMP,
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

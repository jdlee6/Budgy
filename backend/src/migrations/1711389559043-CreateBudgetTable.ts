import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBudgetTable1711389559043 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "budget" (
                "id" SERIAL PRIMARY KEY,
                "amount" integer NOT NULL,
                "userId" integer NOT NULL,
                "categoryId" integer NOT NULL,
                "createdAt" TIMESTAMP,
                "updatedAt" TIMESTAMP
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "budget"
        `);
  }
}

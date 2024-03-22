import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1711149504165 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "category" (
                "id" SERIAL PRIMARY KEY,
                "name" varchar NOT NULL,
                "color" varchar NOT NULL,
                "userId" integer NOT NULL,
                "createdAt" TIMESTAMP,
                "updatedAt" TIMESTAMP
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "category"
        `);
  }
}

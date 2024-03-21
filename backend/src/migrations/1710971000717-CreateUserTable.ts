import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1710971000717 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "name" varchar NOT NULL,
                "email" varchar NOT NULL,
                "password" varchar
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user"
        `);
  }
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateExpenseAmount1713761769135 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense" ALTER COLUMN "amount" TYPE DECIMAL(5, 2)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "expense" ALTER COLUMN "amount" TYPE INTEGER`);
    }

}

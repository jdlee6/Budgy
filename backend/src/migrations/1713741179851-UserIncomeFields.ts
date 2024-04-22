import { MigrationInterface, QueryRunner } from "typeorm";

export class UserIncomeFields1713741179851 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "paycheck1" decimal`);
        await queryRunner.query(`ALTER TABLE "user" ADD "paycheck2" decimal`);
        await queryRunner.query(`ALTER TABLE "user" ADD "side_income" decimal`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "paycheck1"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "paycheck2"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "side_income"`);
    }

}

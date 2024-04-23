import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class UpdateBudgetCategory1713840154002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // add the categoryId column
    await queryRunner.addColumn(
      'budget',
      new TableColumn({
        name: 'categoryId',
        type: 'int',
        default: 2,
      }),
    );

    // add a foreign key constraint to the categoryId column
    await queryRunner.createForeignKey(
      'budget',
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // get the foreign key constract from 'budget'table
    const table = await queryRunner.getTable('budget');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('categoryId') !== -1,
    );

    await queryRunner.dropForeignKey('budget', foreignKey);

    await queryRunner.dropColumn('budget', 'categoryId');
  }
}

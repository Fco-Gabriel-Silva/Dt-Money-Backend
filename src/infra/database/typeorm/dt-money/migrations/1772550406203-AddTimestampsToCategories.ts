import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTimestampsToCategories1772550406203 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("transaction_categories", [
      new TableColumn({
        name: "created_at",
        type: "datetime",
        isNullable: false,
        default: "CURRENT_TIMESTAMP",
      }),
      new TableColumn({
        name: "updated_at",
        type: "datetime",
        isNullable: false,
        default: "CURRENT_TIMESTAMP",
      }),
      new TableColumn({
        name: "deleted_at",
        type: "datetime",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("transaction_categories", "deleted_at");
    await queryRunner.dropColumn("transaction_categories", "updated_at");
    await queryRunner.dropColumn("transaction_categories", "created_at");
  }
}

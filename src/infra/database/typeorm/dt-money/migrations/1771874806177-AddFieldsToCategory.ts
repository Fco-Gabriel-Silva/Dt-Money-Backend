import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldsToCategory1771874806177 implements MigrationInterface {
    name = 'AddFieldsToCategory1771874806177'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type_id" integer NOT NULL, "category_id" integer NOT NULL, "user_id" integer NOT NULL, "value" integer NOT NULL, "created_at" datatime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datatime, "deleted_at" datatime, "description" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_transactions"("id", "type_id", "category_id", "user_id", "value", "created_at", "updated_at", "deleted_at", "description") SELECT "id", "type_id", "category_id", "user_id", "value", "created_at", "updated_at", "deleted_at", "description" FROM "transactions"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_transactions" RENAME TO "transactions"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(50) NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "email", "password", "created_at") SELECT "id", "name", "email", "password", "created_at" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_transaction_categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "color" varchar, "user_id" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction_categories"("id", "name") SELECT "id", "name" FROM "transaction_categories"`);
        await queryRunner.query(`DROP TABLE "transaction_categories"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction_categories" RENAME TO "transaction_categories"`);
        await queryRunner.query(`CREATE TABLE "temporary_transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type_id" integer NOT NULL, "category_id" integer NOT NULL, "user_id" integer NOT NULL, "value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "description" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_transactions"("id", "type_id", "category_id", "user_id", "value", "created_at", "updated_at", "deleted_at", "description") SELECT "id", "type_id", "category_id", "user_id", "value", "created_at", "updated_at", "deleted_at", "description" FROM "transactions"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_transactions" RENAME TO "transactions"`);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "email", "password", "created_at") SELECT "id", "name", "email", "password", "created_at" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_transaction_categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "color" varchar, "user_id" integer, CONSTRAINT "FK_45b03d0bdd23e65581f03ec2818" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction_categories"("id", "name", "color", "user_id") SELECT "id", "name", "color", "user_id" FROM "transaction_categories"`);
        await queryRunner.query(`DROP TABLE "transaction_categories"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction_categories" RENAME TO "transaction_categories"`);
        await queryRunner.query(`CREATE TABLE "temporary_transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type_id" integer NOT NULL, "category_id" integer NOT NULL, "user_id" integer NOT NULL, "value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "description" varchar, CONSTRAINT "FK_bf1cb034a93b703e528b926a75d" FOREIGN KEY ("type_id") REFERENCES "transaction_types" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_e9acc6efa76de013e8c1553ed2b" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c9e41213ca42d50132ed7ab2b0f" FOREIGN KEY ("category_id") REFERENCES "transaction_categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transactions"("id", "type_id", "category_id", "user_id", "value", "created_at", "updated_at", "deleted_at", "description") SELECT "id", "type_id", "category_id", "user_id", "value", "created_at", "updated_at", "deleted_at", "description" FROM "transactions"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`ALTER TABLE "temporary_transactions" RENAME TO "transactions"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" RENAME TO "temporary_transactions"`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type_id" integer NOT NULL, "category_id" integer NOT NULL, "user_id" integer NOT NULL, "value" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, "description" varchar)`);
        await queryRunner.query(`INSERT INTO "transactions"("id", "type_id", "category_id", "user_id", "value", "created_at", "updated_at", "deleted_at", "description") SELECT "id", "type_id", "category_id", "user_id", "value", "created_at", "updated_at", "deleted_at", "description" FROM "temporary_transactions"`);
        await queryRunner.query(`DROP TABLE "temporary_transactions"`);
        await queryRunner.query(`ALTER TABLE "transaction_categories" RENAME TO "temporary_transaction_categories"`);
        await queryRunner.query(`CREATE TABLE "transaction_categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "color" varchar, "user_id" integer)`);
        await queryRunner.query(`INSERT INTO "transaction_categories"("id", "name", "color", "user_id") SELECT "id", "name", "color", "user_id" FROM "temporary_transaction_categories"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction_categories"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(50) NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "email", "password", "created_at") SELECT "id", "name", "email", "password", "created_at" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME TO "temporary_transactions"`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type_id" integer NOT NULL, "category_id" integer NOT NULL, "user_id" integer NOT NULL, "value" integer NOT NULL, "created_at" datatime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datatime, "deleted_at" datatime, "description" varchar)`);
        await queryRunner.query(`INSERT INTO "transactions"("id", "type_id", "category_id", "user_id", "value", "created_at", "updated_at", "deleted_at", "description") SELECT "id", "type_id", "category_id", "user_id", "value", "created_at", "updated_at", "deleted_at", "description" FROM "temporary_transactions"`);
        await queryRunner.query(`DROP TABLE "temporary_transactions"`);
        await queryRunner.query(`ALTER TABLE "transaction_categories" RENAME TO "temporary_transaction_categories"`);
        await queryRunner.query(`CREATE TABLE "transaction_categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "transaction_categories"("id", "name") SELECT "id", "name" FROM "temporary_transaction_categories"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction_categories"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(50) NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "email", "password", "created_at") SELECT "id", "name", "email", "password", "created_at" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME TO "temporary_transactions"`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type_id" integer NOT NULL, "category_id" integer NOT NULL, "user_id" integer NOT NULL, "value" integer NOT NULL, "created_at" datatime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datatime, "deleted_at" datatime, "description" varchar, CONSTRAINT "FK_transaction_user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_transaction_type_id" FOREIGN KEY ("type_id") REFERENCES "transaction_types" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_transaction_category_id" FOREIGN KEY ("category_id") REFERENCES "transaction_categories" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "transactions"("id", "type_id", "category_id", "user_id", "value", "created_at", "updated_at", "deleted_at", "description") SELECT "id", "type_id", "category_id", "user_id", "value", "created_at", "updated_at", "deleted_at", "description" FROM "temporary_transactions"`);
        await queryRunner.query(`DROP TABLE "temporary_transactions"`);
    }

}

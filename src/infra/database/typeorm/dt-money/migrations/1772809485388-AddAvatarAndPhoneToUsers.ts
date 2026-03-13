import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvatarAndPhoneToUsers1772809485388 implements MigrationInterface {
    name = 'AddAvatarAndPhoneToUsers1772809485388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "avatar_url" varchar, "phone" varchar, "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime)`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "email", "password", "created_at") SELECT "id", "name", "email", "password", "created_at" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
        await queryRunner.query(`CREATE TABLE "temporary_transaction_categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "color" varchar, "user_id" integer, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "deleted_at" datetime)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction_categories"("id", "name", "color", "user_id", "created_at", "updated_at", "deleted_at") SELECT "id", "name", "color", "user_id", "created_at", "updated_at", "deleted_at" FROM "transaction_categories"`);
        await queryRunner.query(`DROP TABLE "transaction_categories"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction_categories" RENAME TO "transaction_categories"`);
        await queryRunner.query(`CREATE TABLE "temporary_transaction_categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "color" varchar NOT NULL, "user_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction_categories"("id", "name", "color", "user_id", "created_at", "updated_at", "deleted_at") SELECT "id", "name", "color", "user_id", "created_at", "updated_at", "deleted_at" FROM "transaction_categories"`);
        await queryRunner.query(`DROP TABLE "transaction_categories"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction_categories" RENAME TO "transaction_categories"`);
        await queryRunner.query(`CREATE TABLE "temporary_transaction_categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "color" varchar NOT NULL, "user_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime, CONSTRAINT "FK_45b03d0bdd23e65581f03ec2818" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_transaction_categories"("id", "name", "color", "user_id", "created_at", "updated_at", "deleted_at") SELECT "id", "name", "color", "user_id", "created_at", "updated_at", "deleted_at" FROM "transaction_categories"`);
        await queryRunner.query(`DROP TABLE "transaction_categories"`);
        await queryRunner.query(`ALTER TABLE "temporary_transaction_categories" RENAME TO "transaction_categories"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_categories" RENAME TO "temporary_transaction_categories"`);
        await queryRunner.query(`CREATE TABLE "transaction_categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "color" varchar NOT NULL, "user_id" integer NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "deleted_at" datetime)`);
        await queryRunner.query(`INSERT INTO "transaction_categories"("id", "name", "color", "user_id", "created_at", "updated_at", "deleted_at") SELECT "id", "name", "color", "user_id", "created_at", "updated_at", "deleted_at" FROM "temporary_transaction_categories"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction_categories"`);
        await queryRunner.query(`ALTER TABLE "transaction_categories" RENAME TO "temporary_transaction_categories"`);
        await queryRunner.query(`CREATE TABLE "transaction_categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "color" varchar, "user_id" integer, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "deleted_at" datetime)`);
        await queryRunner.query(`INSERT INTO "transaction_categories"("id", "name", "color", "user_id", "created_at", "updated_at", "deleted_at") SELECT "id", "name", "color", "user_id", "created_at", "updated_at", "deleted_at" FROM "temporary_transaction_categories"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction_categories"`);
        await queryRunner.query(`ALTER TABLE "transaction_categories" RENAME TO "temporary_transaction_categories"`);
        await queryRunner.query(`CREATE TABLE "transaction_categories" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "color" varchar, "user_id" integer, "created_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "updated_at" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "deleted_at" datetime, CONSTRAINT "FK_45b03d0bdd23e65581f03ec2818" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "transaction_categories"("id", "name", "color", "user_id", "created_at", "updated_at", "deleted_at") SELECT "id", "name", "color", "user_id", "created_at", "updated_at", "deleted_at" FROM "temporary_transaction_categories"`);
        await queryRunner.query(`DROP TABLE "temporary_transaction_categories"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "email", "password", "created_at") SELECT "id", "name", "email", "password", "created_at" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class Payment1685743111228 implements MigrationInterface {
    name = 'Payment1685743111228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment" ("id" SERIAL NOT NULL, "status_id" integer NOT NULL, "price" integer NOT NULL, "discount" integer NOT NULL, "final_price" integer NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "amount_payments" integer, "code" integer, "date_payment" TIMESTAMP, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4d08ff1a4f186656d5ad258dc2" ON "payment" ("type") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_4d08ff1a4f186656d5ad258dc2"`);
        await queryRunner.query(`DROP TABLE "payment"`);
    }

}

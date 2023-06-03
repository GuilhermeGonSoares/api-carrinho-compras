import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentStatus1685741890537 implements MigrationInterface {
    name = 'PaymentStatus1685741890537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_status" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c40779d4c0c38f81cc13da11feb" UNIQUE ("name"), CONSTRAINT "PK_b59e2e874b077ea7acf724e4711" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "payment_status"`);
    }

}

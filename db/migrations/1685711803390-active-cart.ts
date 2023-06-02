import { MigrationInterface, QueryRunner } from "typeorm";

export class ActiveCart1685711803390 implements MigrationInterface {
    name = 'ActiveCart1685711803390'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ADD "active" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "active"`);
    }

}

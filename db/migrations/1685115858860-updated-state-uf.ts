import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedStateUf1685115858860 implements MigrationInterface {
    name = 'UpdatedStateUf1685115858860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "states" ADD "uf" character varying(2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "states" ALTER COLUMN "name" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "states" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "states" DROP COLUMN "uf"`);
    }

}

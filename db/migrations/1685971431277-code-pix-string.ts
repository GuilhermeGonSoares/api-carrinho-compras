import { MigrationInterface, QueryRunner } from "typeorm";

export class CodePixString1685971431277 implements MigrationInterface {
    name = 'CodePixString1685971431277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "code" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "payment" ADD "code" integer`);
    }

}

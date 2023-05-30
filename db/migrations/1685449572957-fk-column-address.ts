import { MigrationInterface, QueryRunner } from "typeorm";

export class FkColumnAddress1685449572957 implements MigrationInterface {
    name = 'FkColumnAddress1685449572957'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_b4f5c94493f23641866f161e212"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_c94b380ced34fcad911bc62ac09"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "cityId"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "city_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_8549d17ae3508635410b4fa4fb1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_9e758cdb0ea872d327eb598ac8c" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_9e758cdb0ea872d327eb598ac8c"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP CONSTRAINT "FK_8549d17ae3508635410b4fa4fb1"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "city_id"`);
        await queryRunner.query(`ALTER TABLE "adresses" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "cityId" integer`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_c94b380ced34fcad911bc62ac09" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "adresses" ADD CONSTRAINT "FK_b4f5c94493f23641866f161e212" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

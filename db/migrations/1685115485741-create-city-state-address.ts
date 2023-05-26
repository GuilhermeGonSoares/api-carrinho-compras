import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCityStateAddress1685115485741 implements MigrationInterface {
  name = 'CreateCityStateAddress1685115485741';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "adresses" ("id" SERIAL NOT NULL, "complement" character varying, "numberAddress" integer NOT NULL, "cep" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "cityId" integer, CONSTRAINT "PK_2787c84f7433e390ff8961d552d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "states" ("id" SERIAL NOT NULL, "name" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_09ab30ca0975c02656483265f4f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "cities" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "stateId" integer, CONSTRAINT "PK_4762ffb6e5d198cfec5606bc11e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "adresses" ADD CONSTRAINT "FK_b4f5c94493f23641866f161e212" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "adresses" ADD CONSTRAINT "FK_c94b380ced34fcad911bc62ac09" FOREIGN KEY ("cityId") REFERENCES "cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cities" ADD CONSTRAINT "FK_ded8a17cd090922d5bac8a2361f" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cities" DROP CONSTRAINT "FK_ded8a17cd090922d5bac8a2361f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "adresses" DROP CONSTRAINT "FK_c94b380ced34fcad911bc62ac09"`,
    );
    await queryRunner.query(
      `ALTER TABLE "adresses" DROP CONSTRAINT "FK_b4f5c94493f23641866f161e212"`,
    );
    await queryRunner.query(`DROP TABLE "cities"`);
    await queryRunner.query(`DROP TABLE "states"`);
    await queryRunner.query(`DROP TABLE "adresses"`);
  }
}

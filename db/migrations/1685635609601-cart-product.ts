import { MigrationInterface, QueryRunner } from "typeorm";

export class CartProduct1685635609601 implements MigrationInterface {
    name = 'CartProduct1685635609601'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cart_product" ("id" SERIAL NOT NULL, "cart_id" integer NOT NULL, "product_id" integer NOT NULL, "amount" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cartId" integer, "productId" integer, CONSTRAINT "PK_dccd1ec2d6f5644a69adf163bc1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD CONSTRAINT "FK_139f8024067696fe5a8400ebda2" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_product" ADD CONSTRAINT "FK_4f1b0c66f4e0b4610e14ca42e5c" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_product" DROP CONSTRAINT "FK_4f1b0c66f4e0b4610e14ca42e5c"`);
        await queryRunner.query(`ALTER TABLE "cart_product" DROP CONSTRAINT "FK_139f8024067696fe5a8400ebda2"`);
        await queryRunner.query(`DROP TABLE "cart_product"`);
    }

}

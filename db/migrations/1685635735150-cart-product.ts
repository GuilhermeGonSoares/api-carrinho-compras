import { MigrationInterface, QueryRunner } from 'typeorm';

export class CartProduct1685635735150 implements MigrationInterface {
  name = 'CartProduct1685635735150';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart_product" DROP CONSTRAINT "FK_139f8024067696fe5a8400ebda2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_product" DROP CONSTRAINT "FK_4f1b0c66f4e0b4610e14ca42e5c"`,
    );
    await queryRunner.query(`ALTER TABLE "cart_product" DROP COLUMN "cartId"`);
    await queryRunner.query(
      `ALTER TABLE "cart_product" DROP COLUMN "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_product" ADD CONSTRAINT "FK_2c57e42b1010332303f5838b6b7" FOREIGN KEY ("cart_id") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_product" ADD CONSTRAINT "FK_c6125c699faf07986d79ac16cc7" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "cart_product" DROP CONSTRAINT "FK_c6125c699faf07986d79ac16cc7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_product" DROP CONSTRAINT "FK_2c57e42b1010332303f5838b6b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_product" ADD "productId" integer`,
    );
    await queryRunner.query(`ALTER TABLE "cart_product" ADD "cartId" integer`);
    await queryRunner.query(
      `ALTER TABLE "cart_product" ADD CONSTRAINT "FK_4f1b0c66f4e0b4610e14ca42e5c" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "cart_product" ADD CONSTRAINT "FK_139f8024067696fe5a8400ebda2" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}

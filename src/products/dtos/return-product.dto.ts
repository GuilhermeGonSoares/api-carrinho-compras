import { ReturnCategoryDto } from '../../category/dtos/return-category.dto';
import { Product } from '../entities/product.entity';

export class ReturnProductDto {
  private id: number;
  private name: string;
  private price: number;
  private image: string;
  private categoryId: number;
  private category?: ReturnCategoryDto;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.price = product.price;
    this.image = product.image;
    this.categoryId = product.category ? undefined : product.categoryId;
    this.category = product.category
      ? new ReturnCategoryDto(product.category)
      : undefined;
  }
}

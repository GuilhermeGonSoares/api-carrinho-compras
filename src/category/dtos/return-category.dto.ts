import { Category } from '../entities/category.entity';

export class ReturnCategoryDto {
  private id: number;
  private name: string;

  constructor(category: Category) {
    this.id = category.id;
    this.name = category.name;
  }
}

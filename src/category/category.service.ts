import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async create(categoryDto: CreateCategoryDto) {
    const category: Category | undefined = await this.findCategoryByName(
      categoryDto.name,
    ).catch(() => undefined);

    if (category) {
      throw new BadRequestException(
        `Already exist category with this ${category.name} name`,
      );
    }

    return await this.repository.save({ ...categoryDto });
  }

  async findCategoryByName(name: string) {
    const category = await this.repository.findOne({ where: { name } });

    if (!category) {
      throw new NotFoundException(`Not found category with this ${name} name`);
    }

    return category;
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dtos/return-category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<ReturnCategoryDto[]> {
    return (await this.categoryService.findAll()).map(
      (category) => new ReturnCategoryDto(category),
    );
  }

  @Post()
  async create(
    @Body() category: CreateCategoryDto,
  ): Promise<ReturnCategoryDto> {
    const newCategory = await this.categoryService.create(category);
    return new ReturnCategoryDto(newCategory);
  }
}

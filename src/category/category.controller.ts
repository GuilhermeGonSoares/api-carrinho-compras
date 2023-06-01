import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dtos/return-category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<ReturnCategoryDto[]> {
    return (await this.categoryService.findAll()).map(
      (category) => new ReturnCategoryDto(category),
    );
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post()
  async create(
    @Body() category: CreateCategoryDto,
  ): Promise<ReturnCategoryDto> {
    const newCategory = await this.categoryService.create(category);
    return new ReturnCategoryDto(newCategory);
  }
}

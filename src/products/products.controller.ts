import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role.enum';
import { ReturnProductDto } from './dtos/return-product.dto';
import { UpdatedProductDto } from './dtos/updated-product.dtos';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async findAll() {
    return (await this.productService.findAll()).map(
      (product) => new ReturnProductDto(product),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOneProduct(+id);
    return new ReturnProductDto(product);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body() product: CreateProductDto) {
    const newProduct = await this.productService.create(product);
    return new ReturnProductDto(newProduct);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async updated(
    @Param('id') id: string,
    @Body() productDto: UpdatedProductDto,
  ) {
    const product = await this.productService.updated(+id, productDto);
    return new ReturnProductDto(product);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const product = await this.productService.delete(+id);
    return new ReturnProductDto(product);
  }
}

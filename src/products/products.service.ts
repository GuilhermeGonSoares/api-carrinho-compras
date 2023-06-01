import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { CategoryService } from '../category/category.service';
import { UpdatedProductDto } from './dtos/updated-product.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly repository: Repository<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll() {
    return await this.repository.find();
  }

  async create(productDto: CreateProductDto) {
    await this.categoryService.findCategoryById(productDto.categoryId);

    const product: Product | undefined = await this.findProductByName(
      productDto.name,
    ).catch(() => undefined);

    if (product) {
      throw new BadRequestException(`Product name ${product.name} exist`);
    }

    return await this.repository.save({ ...productDto });
  }

  async findOneProduct(id: number) {
    const product = await this.repository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!product) {
      throw new NotFoundException(`Product id ${id} not found`);
    }

    return product;
  }

  async findProductByName(name: string) {
    const product = await this.repository.findOne({ where: { name } });

    if (!product) {
      throw new NotFoundException(`Product name ${name} not found`);
    }

    return product;
  }

  async findProductById(id: number) {
    const product = await this.repository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product id ${id} not found`);
    }

    return product;
  }

  async updated(id: number, productDto: UpdatedProductDto) {
    const { name, categoryId } = productDto;
    const product = await this.findProductById(id);

    if (categoryId) {
      await this.categoryService.findCategoryById(productDto.categoryId);
    }

    if (name && name !== product.name) {
      const product = await this.findProductByName(name).catch(() => undefined);
      if (product) {
        throw new BadRequestException(`Product name ${product.name} exist`);
      }
    }

    return await this.repository.save({ ...product, ...productDto });
  }

  async delete(id: number) {
    const product = await this.findProductById(id);
    return await this.repository.remove(product);
  }
}

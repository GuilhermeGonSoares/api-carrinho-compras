import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';

export class UpdatedProductDto extends PartialType<CreateProductDto>(
  CreateProductDto,
) {}

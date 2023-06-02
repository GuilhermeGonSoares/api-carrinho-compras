import { IsInt, IsNumber } from 'class-validator';

export class InsertCartDto {
  @IsInt()
  productId: number;

  @IsNumber()
  amount: number;
}

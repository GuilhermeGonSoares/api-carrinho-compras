import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  addressId: number;

  @IsOptional()
  @IsNumber()
  amountPayments?: number;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsString()
  datePayment?: string;
}

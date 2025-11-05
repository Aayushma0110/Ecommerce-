import { IsNumber, IsPositive, Min } from 'class-validator';

export class OrderItemDto {
  @IsNumber({}, { message: 'productId must be a number' })
  @IsPositive({ message: 'productId must be positive' })
  productId: number;

  @IsNumber({}, { message: 'quantity must be a number' })
  @IsPositive({ message: 'quantity must be positive' })
  @Min(1, { message: 'quantity must be at least 1' })
  quantity: number;

  @IsNumber({}, { message: 'price must be a number' })
  @IsPositive({ message: 'price must be positive' })
  price: number;
}

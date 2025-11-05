import {
  IsArray,
  IsOptional,
  IsString,
  MinLength,
  IsIn,
  ValidateNested,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class UpdateOrderDto {
  @IsOptional()
  @IsNumber({}, { message: 'userId must be a number' })
  @IsPositive({ message: 'userId must be positive' })
  userId?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems?: OrderItemDto[];

  @IsOptional()
  @IsString()
  @MinLength(10)
  shippingAddress?: string;

  @IsOptional()
  @IsString()
  @IsIn(['credit_card', 'debit_card', 'paypal', 'cash_on_delivery'])
  paymentMethod?: 'credit_card' | 'debit_card' | 'paypal' | 'cash_on_delivery';

  @IsOptional()
  @IsString()
  @IsIn(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}

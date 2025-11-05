import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsNumber({}, { message: 'userId must be a number' })
  @IsPositive({ message: 'userId must be positive' })
  userId: number;

  @IsArray({ message: 'orderItems must be an array' })
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];

  @IsString()
  @IsNotEmpty({ message: 'shippingAddress is required' })
  @MinLength(10, { message: 'shippingAddress must be at least 10 characters' })
  shippingAddress: string;

  @IsString()
  @IsIn(['credit_card', 'debit_card', 'paypal', 'cash_on_delivery'], {
    message:
      'paymentMethod must be one of credit_card|debit_card|paypal|cash_on_delivery',
  })
  paymentMethod: 'credit_card' | 'debit_card' | 'paypal' | 'cash_on_delivery';
}

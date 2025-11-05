import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { PaymentStatus } from '../entities/payment.entities';

export class CreatePaymentDto {
  @IsString()
  orderId: string;

  @IsString()
  userId: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus;

  @IsOptional()
  @IsString()
  transactionId?: string;
}

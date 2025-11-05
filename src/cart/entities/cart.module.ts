import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PaymentModule } from 'src/payment/payment.module';
import { CartItem } from './cart.entities';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([CartItem]), PaymentModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
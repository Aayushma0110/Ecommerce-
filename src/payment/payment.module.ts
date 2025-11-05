import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entities';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { OrdersModule } from '../order/order.module'; // Adjust path if needed
import { UsersModule } from '../user/user.modules'; // Adjust path if needed

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    OrdersModule, // Import if PaymentService needs to interact with Order
    UsersModule, // Import if PaymentService needs to interact with User
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
  exports: [PaymentService], // Export for use in other modules
})
export class PaymentModule {}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Payment } from 'src/payment/entities/payment.entities';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @Column({ nullable: true })
  userId: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @ManyToOne(() => Payment, { nullable: true })
  payment: Payment;
}
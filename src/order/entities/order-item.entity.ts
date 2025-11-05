import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
@Entity('Order_items')
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //   @Column()
  //   productId: number;

  @Column()
  quantity: number;

  @Column('decimal')
  price: number;

  @ManyToOne(() => Product, (product) => product.id)
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;
}

import { OrderItem } from 'src/order/entities/order-item.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  brand: string;

  // @Column()
  // imageUrls: string;

  @Column({ type: 'jsonb' })
  variant: variant[];

  @OneToMany(() => OrderItem, (OrderItem) => OrderItem.product)
  OrderItem: OrderItem[];
}
type variant = {
  color: string;
  size: string;
  stock: number;
};

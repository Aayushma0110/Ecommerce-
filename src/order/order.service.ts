import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    private readonly dataSource: DataSource, //
  ) {}

  async getAllOrders(): Promise<Order[]> {
    try {
      return await this.orderRepository.find({
        relations: ['orderItems', 'orderItems.product'],
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getOneOrder(id: string): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: id },
        relations: ['orderItems', 'orderItems.product'],
      });
      if (!order) throw new NotFoundException('Order not found');
      return order;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  //   async addOrder(createOrderDto: CreateOrderDto): Promise<Order | null> {
  //     try {
  //       const createOrder = await this.dataSource.transaction(async (manager) => {

  //         const order = this.orderRepository.create({
  //           shippingAddress: createOrderDto.shippingAddress,
  //           paymentMethod: createOrderDto.paymentMethod as any,
  //           status: 'pending',
  //           totalAmount: 0,
  //         });

  //         const savedOrder = await manager.save(order);

  //         // Create items
  //         const orderItems = createOrderDto.orderItems.map((item) =>
  //           this.orderItemRepository.create({
  //             ...item,
  //             order: createOrder,
  //           })),

  //         await manager.save(orderItems)
  //         const fullOrder = await this.orderRepository.findOne({
  //           where: { id: createOrderDto.id },
  //           relations: ['orderItems'],
  //         });

  //         // const orderItems: OrderItem[] = [];
  //         // for (const item of createOrderDto.orderItems) {
  //         //   const product = await this.productRepository.findOneBy({
  //         //     id: item.productId,
  //         //   });

  //         //   if (!product) {
  //         //     throw new NotFoundException(
  //         //       `Product with ID ${item.productId} not found`,
  //         //     );
  //         //   }

  //         //   const orderItem = this.orderItemRepository.create({
  //         //     quantity: item.quantity,
  //         //     price: item.price,
  //         //     order: savedOrder,
  //         //     product,
  //         //   });

  //         //   orderItems.push(orderItem);

  //         return fullOrder;
  //       }

  //     return createOrder;
  //     }
  // } catch(error) {
  //     throw new InternalServerErrorException(error.message);
  //   }
  // }

  async addOrder(createOrderDto: CreateOrderDto): Promise<Order | null> {
    try {
      const order = await this.dataSource.transaction(async (manager) => {
        // Create order
        const newOrder = this.orderRepository.create({
          ...createOrderDto,
        });

        const savedOrder = await manager.save(newOrder);

        // Create order items
        const orderItems = createOrderDto.orderItems.map((item) =>
          this.orderItemRepository.create({
            ...item,
            order: savedOrder,
          }),
        );

        await manager.save(orderItems);

        const fullOrder = await this.orderRepository.findOne({
          where: { id: savedOrder.id },
          relations: ['orderItems'],
        });

        return fullOrder;
      });

      return order;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateOrder(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    try {
      const existingOrder = await this.orderRepository.findOne({
        where: { id: id },
        relations: ['orderItems'],
      });

      if (!existingOrder) {
        throw new NotFoundException('Order not found');
      }

      // Convert userId to number safely
      const dtoToMerge = {
        ...updateOrderDto,
        ...(updateOrderDto.userId !== undefined && {
          userId: Number(updateOrderDto.userId),
        }),
      };

      if (
        dtoToMerge.userId !== undefined &&
        (isNaN(Number(dtoToMerge.userId)) || dtoToMerge.userId === null)
      ) {
        delete dtoToMerge.userId;
      }

      const updatedOrder = this.orderRepository.merge(
        existingOrder,
        dtoToMerge as Partial<Order>,
      );

      return this.orderRepository.save(updatedOrder);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async deleteOrder(id: string): Promise<void> {
    try {
      const result = await this.orderRepository.delete({ id: id });
      if (result.affected === 0) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

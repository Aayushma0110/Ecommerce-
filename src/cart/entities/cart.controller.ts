import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartItem } from './cart.entities';
import { CreateCartDto } from '../dto/create-cart.dto';
import { CheckoutCartDto } from '../dto/checkout-cart.dto';


@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Get all items in the cart
  @Get()
  getAllItems(): Promise<CartItem[]> {
    return this.cartService.findAll();
  }

  // Add an item to the cart
  @Post()
  addItem(@Body() createCartDto: CreateCartDto): Promise<CartItem> {
    return this.cartService.addItem(createCartDto);
  }

  // Remove a specific item by id
  @Delete('/:id')
  removeItem(@Param('id') id: string) {
    return this.cartService.removeItem(Number(id));
  }

  // Clear all items from the cart
  @Delete()
  clearCart() {
    return this.cartService.clearCart();
  }

  // Checkout cart
  @Post('/checkout')
  checkout(@Body() checkoutCartDto: CheckoutCartDto) {
    return this.cartService.checkout(checkoutCartDto);
  }
}

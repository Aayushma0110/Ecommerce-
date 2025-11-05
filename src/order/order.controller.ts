import {
  Controller,
  Get,
  // Query,
  Param,
  Post,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './order.service';
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // @Get()
  // getAll(
  //   @Query('status') status?: string,
  //   @Query('userId') userId?: string,
  //   @Query('page') page?: string,
  //   @Query('limit') limit?: string,
  // ) {
  //   const filters: any = {};
  //   if (status) filters.status = status;
  //   if (userId) filters.userId = Number(userId);
  //   if (page) filters.page = Number(page);
  //   if (limit) filters.limit = Number(limit);

  //   return {
  //     message: this.ordersService.findAll(filters),
  //     appliedFilters: filters,
  //   };
  // }

  @Get(':id')
  getOne(@Param('id') id: string) {
    const msg = this.ordersService.getOneOrder(id);
    return { message: msg };
  }

  @Post('/')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.addOrder(createOrderDto);
  }

  // @Patch(':id/status')
  // updateStatus(@Param('id') id: string, @Body('status') status: string) {
  //   return this.ordersService.(id, status);
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id') id: string) {
    return this.ordersService.deleteOrder(id);
  }
}

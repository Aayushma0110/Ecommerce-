import {
  Controller,
  // Get,
  Post,
  Body,
  // ParseIntPipe,
  // Delete,
  //Req,
  //Res,
  Put,
  //HttpStatus,
  Param,
  //Query,
  //ForbiddenException,
} from '@nestjs/common';
//import express from 'express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  addProduct(@Body() productBody: CreateProductDto) {
    return this.productService.addProduct(productBody);
  }
  @Put('/:id')
  updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }
  // @Get('/')
  // getAllProducts(): Promise<Product[]> {
  //   return this.productService.getAllProducts();
  // }
  // @Get('/:id')
  // getOneProduct(@Param('id') id: string) {
  //   return this.productService.getOneProduct(id);
  // }
  // @Delete('/:id')
  // DeleteOneProduct(@Param('id') id: string) {
  //   return this.productService.deleteOneProduct(id);
  // }
}

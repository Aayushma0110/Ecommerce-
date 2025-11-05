import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  getAllproduct() {
    return 'List of product';
  }
  addProduct(CreateProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(CreateProductDto); // this line is responsible for creating and copying the properties from entites.
      return this.productRepository.save(product); // this line id responsible for saving  the data is db.
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateProduct(id: string, UpdateProductDto: UpdateProductDto) {
    try {
      const existingProduct = await this.productRepository.findOneBy({ id });
      if (!existingProduct) {
        throw new NotFoundException('product not found');
      }

      const updateProduct = this.productRepository.merge(
        existingProduct,
        UpdateProductDto,
      );
      return this.productRepository.save(updateProduct);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

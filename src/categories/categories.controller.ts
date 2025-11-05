import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.serivice';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    const msg = this.categoriesService.findOne(id);
    return { message: msg };
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createCategoryDto: CreateCategoryDto) {
    const msg = this.categoriesService.create(createCategoryDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: msg,
      data: createCategoryDto,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseIntPipe) id: number) {
    const msg = this.categoriesService.remove(id);
    return { message: msg };
  }
}

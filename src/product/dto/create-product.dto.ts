import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class variantDto {
  @IsNotEmpty()
  @IsString()
  color: string;

  @IsString()
  size: string;

  @IsNumber()
  stock: number;
}
export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsString()
  brand: string;

  @ValidateNested({ each: true })
  variants: variantDto[];
}

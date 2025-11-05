import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsNumber,
} from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  @MinLength(2, { message: 'name must be at least 2 characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'description is required' })
  @MinLength(10, { message: 'description must be at least 10 characters' })
  description: string;

  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'parentCategoryId must be a number' })
  parentCategoryId?: number;
}

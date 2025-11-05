import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'name must be at least 2 characters' })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'description must be at least 10 characters' })
  description?: string;

  @IsOptional()
  @IsBoolean({ message: 'isActive must be a boolean' })
  isActive?: boolean;

  @IsOptional()
  @IsNumber({}, { message: 'parentCategoryId must be a number' })
  parentCategoryId?: number;
}

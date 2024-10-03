import { IsString, IsInt, IsBoolean, IsOptional, IsArray, IsPositive } from 'class-validator';
import { CreateProductDto } from './create-product.dto';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({
    description: 'Name of the product (optional)',
  
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    description: 'Category of the product (optional)',
   
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({
    description: 'Price of the product (optional)',
    
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional({
  
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  discountPrice?: number;

  @ApiPropertyOptional({
    description: 'Indicates if the product is on discount (optional)',
   
  })
  @IsBoolean()
  @IsOptional()
  isOnDiscount?: boolean;

  @ApiPropertyOptional({
  description: 'Image URL of the product (optional)',

  })
 

  @ApiPropertyOptional({
    description: 'Description of the product (optional)',

  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Array of image URLs for the product (optional)',
   
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageUrl?: string[];

  @ApiPropertyOptional({
    description: 'Stock quantity of the product (optional)',
 
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;
}
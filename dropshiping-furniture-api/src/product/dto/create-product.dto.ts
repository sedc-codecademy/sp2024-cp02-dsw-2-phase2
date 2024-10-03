// import { IsString, IsInt, IsBoolean, IsOptional, IsArray, IsPositive } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class CreateProductDto {
//   @ApiProperty({ description: 'The name of the product' }) 
//   @IsString()
//   name: string;

//   @ApiProperty({ description: 'The category of the product' })
//   @IsString()
//   category: string;

//   @ApiProperty({ description: 'The price of the product' })
//   @IsInt()
//   @IsPositive()
//   price: number;

//   @ApiProperty({ description: 'The discounted price of the product', required: false })
//   @IsInt()
//   @IsPositive()
//   @IsOptional() 
//   discountPrice?: number;

//   @ApiProperty({ description: 'Is the product on discount?' })
//   @IsBoolean()
//   isOnDiscount: boolean;

  
//   @ApiProperty({ description: 'The description of the product', required: false })
//   @IsString()
//   @IsOptional()
//   description?: string;

//   @ApiProperty({ description: 'The URLs of the product images', type: [String] })
//   @IsArray()
//   @IsString({ each: true }) 
//   imageUrl: string[];

//   @ApiProperty({ description: 'The available stock of the product' })
//   @IsInt()
//   @IsPositive()
//   stock: number;
// }
import { IsString, IsInt, IsBoolean, IsOptional, IsArray, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'The name of the product' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the product' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The price of the product' })
  @IsInt()
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'The stock of the product' })
  @IsInt()
  @IsPositive()
  stock: number;

  @ApiProperty({ description: 'The category of the product' })
  @IsString()
  category: string;

  @ApiProperty({ description: 'The discount availability of the product' })
  @IsBoolean()
  isOnDiscount: boolean;

  @ApiProperty({ description: 'The images of the product' })
  @IsArray()
  @IsOptional()
  images?: string[];
}

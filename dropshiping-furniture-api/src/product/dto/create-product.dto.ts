import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsArray,
  IsPositive,
  IsNumber
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

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
  @IsNumber()
  category_id?: number;

  @ApiProperty({ description: 'The discount availability of the product' })
  @IsBoolean()
  isOnDiscount: boolean;

  @ApiProperty({ description: 'The images of the product' })
  @IsArray()
  @IsOptional()
  images?: string[];
}

import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsArray,
  IsPositive,
} from "class-validator";
import { CreateProductDto } from "./create-product.dto";
import { PartialType } from "@nestjs/mapped-types";
import { Category } from "src/categories/entities/category.entity";


export class UpdateProductDto extends PartialType(CreateProductDto) {

  @IsString()
  @IsOptional()
  name: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  price: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  discountPrice: number;

  @IsBoolean()
  @IsOptional()
  isOnDiscount: boolean;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageUrl: string[];

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock: number;

  @IsOptional()
  category: Category[];
}


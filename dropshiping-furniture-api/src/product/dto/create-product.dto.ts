import {
  IsString,
  IsInt,
  IsBoolean,
  IsOptional,
  IsArray,
  IsPositive,
} from "class-validator";
import { PartialType } from "@nestjs/swagger";
import { CreateCategoryDto } from "src/categories/dto/create-category.dto";
import { Category } from "src/categories/entities/category.entity";

export class CreateProductDto extends PartialType(CreateCategoryDto) {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  stock: number;

  @IsBoolean()
  isOnDiscount: boolean;

  @IsArray()
  @IsOptional()
  images?: string[];

  @IsOptional()
  category: Category[]

}

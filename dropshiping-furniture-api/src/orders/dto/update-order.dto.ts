import { IsInt, IsString, IsEmail, IsOptional } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderDto } from "./create-order.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiPropertyOptional({
    description: "ID of the product being ordered (optional)",
  })
  @IsInt()
  @IsOptional()
  productId?: number;

  @ApiPropertyOptional({
    description: "Quantity of the product being ordered (optional)",
  })
  @IsInt()
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({
    description: "Total price of the order (optional)",
  })
  @IsInt()
  @IsOptional()
  totalPrice?: number;

  @ApiPropertyOptional({
    description: "Name of the customer placing the order (optional)",
  })
  @IsString()
  @IsOptional()
  customerName?: string;

  @ApiPropertyOptional({
    description: "Email of the customer placing the order (optional)",
  })
  @IsEmail()
  @IsOptional()
  customerEmail?: string;

  @ApiPropertyOptional({
    description: "Additional notes or instructions for the order (optional)",
  })
  @IsString()
  @IsOptional()
  notes?: string;
}

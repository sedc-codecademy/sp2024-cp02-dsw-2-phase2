import { IsInt, IsString, IsEmail, IsOptional, IsPositive, IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Quantity of the product being ordered',
  })
  @IsInt()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    description: 'Total price of the order',
  })
  @IsInt()
  totalPrice?: number;

  @ApiProperty({
    description: 'Name of the customer placing the order',
  })
  @IsString()
  customerName: string;

  @ApiProperty({
    description: 'Email of the customer placing the order',
  })
  @IsEmail()
  customerEmail: string;

  @ApiPropertyOptional({
    description: 'Additional notes or instructions for the order',
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'List of product IDs being ordered',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNotEmpty()
  @IsInt({ each: true })
  productIds: number[]; 


}



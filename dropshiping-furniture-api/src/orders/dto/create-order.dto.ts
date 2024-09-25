import { IsInt, IsString, IsEmail, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'ID of the product being ordered',
   
  })
  @IsInt()
  @IsPositive()
  productId: number;

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
  totalPrice: number;

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
}

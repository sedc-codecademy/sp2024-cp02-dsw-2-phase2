import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, IsEmail, IsOptional, IsArray, IsNotEmpty } from 'class-validator';


export class UpdateOrderDto extends PartialType(CreateOrderDto) {
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

import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderProductDto {
  @ApiProperty({
    description: 'ID of the order this product belongs to',
  })
  @IsInt()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({
    description: 'ID of the product being ordered',
  })
  @IsInt()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    description: 'Quantity of the product being ordered',
  })
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}

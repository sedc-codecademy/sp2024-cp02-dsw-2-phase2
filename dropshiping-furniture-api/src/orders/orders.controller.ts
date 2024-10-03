import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { ApiTags, ApiResponse, ApiParam, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders', description: 'Retrieve a list of all orders placed.' })
  @ApiResponse({ status: 200, description: 'Get all orders.' })
  async findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID', description: 'Retrieve a specific order by its unique identifier.' })
  @ApiParam({ name: 'id', required: true, description: 'Order ID' })
  @ApiResponse({ status: 200, description: 'Get order by ID.' })
  findOne(@Param('id') id: number): Promise<Order> {
    return this.orderService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new order', description: 'Add a new order to the system.' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'Create a new order.' })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
      return this.orderService.create(createOrderDto);
  }

  @Put(':id')
@ApiOperation({ summary: 'Update an existing order', description: 'Modify the details of an existing order.' })
@ApiParam({ name: 'id', required: true, description: 'Order ID' })
@ApiBody({ type: UpdateOrderDto })
@ApiResponse({ status: 200, description: 'Update an existing order.' })
async update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
 
  const existingOrder = await this.orderService.findOne(id);
  const updatedOrder = { ...existingOrder, ...updateOrderDto };

  return this.orderService.update(id, updatedOrder);
}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order', description: 'Remove an order from the system by its unique identifier.' })
  @ApiParam({ name: 'id', required: true, description: 'Order ID' })
  @ApiResponse({ status: 204, description: 'Delete an order.' })
  async remove(@Param('id') id: number): Promise<void> {
    await this.orderService.remove(id);
    return; 
}
}

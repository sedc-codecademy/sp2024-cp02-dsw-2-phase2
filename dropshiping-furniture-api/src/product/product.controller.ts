import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products', description: 'Retrieve a list of all products available in the store.' })
  @ApiResponse({ status: 200, description: 'Get all products.' })
  async findAll(): Promise<Product[]> {
      const products = await this.productService.findAll(); 
      console.log(products); 
      return products;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID', description: 'Retrieve a single product by its unique identifier.' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Get product by ID.' })
  findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Post()
@ApiOperation({ summary: 'Create a new product', description: 'Add a new product to the store inventory.' })
@ApiBody({ type: CreateProductDto })
@ApiResponse({ status: 201, description: 'Create a new product.' })
async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto); 
}


  @Put(':id')
  @ApiOperation({ summary: 'Update an existing product', description: 'Modify the details of an existing product by its unique identifier.' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Update an existing product.' })
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productService.update(id, updateProductDto as Product);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product', description: 'Remove a product from the store inventory by its unique identifier.' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @ApiResponse({ status: 204, description: 'Delete a product.' })
  remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }
}

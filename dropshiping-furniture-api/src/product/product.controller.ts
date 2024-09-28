import { Controller, Get, Post, Param, Body, Put, Delete, Query } from '@nestjs/common';
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

  @Get('category/:category')
  @ApiOperation({ summary: 'Get products by category', description: 'Retrieve products filtered by category.' })
  @ApiParam({ name: 'category', required: true, description: 'Product category' })
  @ApiResponse({ status: 200, description: 'Get products by category.' })
  async findByCategory(@Param('category') category: string): Promise<Product[]> {
    return this.productService.findByCategory(category);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search products by name', description: 'Retrieve products filtered by name.' })
  @ApiResponse({ status: 200, description: 'Get products by name.' })
  async findByName(@Query('name') name: string): Promise<Product[]> {
    return this.productService.findByName(name);
  }

  @Get('discounted')
  @ApiOperation({ summary: 'Get discounted products', description: 'Retrieve products that are currently on discount.' })
  @ApiResponse({ status: 200, description: 'Get discounted products.' })
  async findDiscountedProducts(): Promise<Product[]> {
    return this.productService.findDiscountedProducts();
  }

  @Get('available')
  @ApiOperation({ summary: 'Get available products', description: 'Retrieve products that are in stock.' })
  @ApiResponse({ status: 200, description: 'Get available products.' })
  async findAvailableProducts(): Promise<Product[]> {
    return this.productService.findAvailableProducts();
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
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productService.update(id, updateProductDto as Product);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product', description: 'Remove a product from the store inventory by its unique identifier.' })
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @ApiResponse({ status: 204, description: 'Delete a product.' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.productService.remove(id);
  }
}

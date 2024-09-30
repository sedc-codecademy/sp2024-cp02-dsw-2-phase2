import { Body, Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    console.log('Fetching all products'); 
    const products = await this.productRepository.find();
    console.log('Products retrieved:', products); 
    return products;
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOneBy({ id });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
}

async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
  const existingProduct = await this.findOne(id);
  if (!existingProduct) {
    throw new NotFoundException('Product not found');
  }
  const updatedProduct: Product = {
    ...existingProduct,
    ...updateProductDto, 
  };

  await this.productRepository.save(updatedProduct); 
  return updatedProduct; 
}


 async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  } 

  async findByCategory(category: string): Promise<Product[]> {
    return await this.productRepository.find({ where: { category } });
  }

  async findDiscountedProducts(): Promise<Product[]> {
    return await this.productRepository.find({ where: { isOnDiscount: true } });
  }

  async findByName(name: string): Promise<Product[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .where('product.name LIKE :name', { name: `%${name}%` })
      .getMany();
  }

  async findAvailableProducts(): Promise<Product[]> {
    return await this.productRepository.find({ where: { stock: MoreThan(0) } });
  }
}

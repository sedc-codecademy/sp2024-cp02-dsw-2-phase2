import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';


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
    const product = this.productRepository.create(createProductDto); // Создавање на нов објект
    return await this.productRepository.save(product);
}



  async update(id: number, product: Product): Promise<Product> {
    await this.productRepository.update(id, product);
    return await this.productRepository.findOneBy({ id });
  }

  async updateStock(productId: number, quantity: number): Promise<void> {
    const product = await this.productRepository.findOneBy({ id: productId });
    if (product) {
      product.stock -= quantity; 
      await this.productRepository.save(product);
    }
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}

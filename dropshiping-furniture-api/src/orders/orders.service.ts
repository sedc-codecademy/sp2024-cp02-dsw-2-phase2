import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>, 
  ) {} 
   

  findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['products'] }); 
  }

  findOne(id: number): Promise<Order> {
    return this.orderRepository.findOne({ where: { id }, relations: ['products'] }); 
  }

async create(createOrderDto: CreateOrderDto): Promise<Order> {
 
  if (!createOrderDto.productIds || createOrderDto.productIds.length === 0) {
    throw new Error('No product IDs provided');
  }

  
  const products = await this.productRepository.findBy({
    id: In(createOrderDto.productIds),
  });

  if (products.length === 0) {
    throw new Error('No products found for the provided IDs');
  }

 // calculate total price
  const totalPrice = products.reduce((acc, product) => {
    if (product.stock < createOrderDto.quantity) {
      throw new Error(`Not enough stock for product ID ${product.id}`);
    }
    return acc + (product.price * createOrderDto.quantity);
  }, 0);

 
  const order = new Order();
  order.quantity = createOrderDto.quantity;
  order.totalPrice = totalPrice; 
  order.customerName = createOrderDto.customerName;
  order.customerEmail = createOrderDto.customerEmail;
  order.notes = createOrderDto.notes;
 

  
  const savedOrder = await this.orderRepository.save(order);


  for (const product of products) {
    const orderProduct = new OrderProduct();
    orderProduct.order = savedOrder; 
    orderProduct.product = product; 
    orderProduct.quantity = createOrderDto.quantity; 

    await this.orderProductRepository.save(orderProduct); 

    // reduce product quantity/stock
    product.stock -= createOrderDto.quantity; 
    await this.productRepository.save(product); 
  }

  return savedOrder; 
}


  async update(id: number, order: Order): Promise<Order> {
    await this.orderRepository.update(id, order);
    return this.orderRepository.findOne({ where: { id }, relations: ['products'] }); 
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete(id);
  }
}

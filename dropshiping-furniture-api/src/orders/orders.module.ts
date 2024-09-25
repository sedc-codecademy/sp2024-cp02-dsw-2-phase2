import { Module } from '@nestjs/common';
import { OrderService } from './orders.service';
import { OrderController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from 'src/product/product.controller';
import { ProductService } from 'src/product/product.service';
import { Order } from './entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product])],
  providers: [ProductService, OrderService],
  controllers: [ProductController, OrderController],
})
export class OrdersModule {}

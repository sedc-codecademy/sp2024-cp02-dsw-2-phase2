import { Order } from "src/orders/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";


@Entity()
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderProducts)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  product: Product;

  @Column('int')
  quantity: number;
}


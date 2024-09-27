import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column("int")
  price: number;

  @Column("int", { nullable: true })
  discountPrice: number;

  @Column()
  isOnDiscount: boolean;

  @Column({ nullable: true })
  image?: string;

  @Column("text", { nullable: true })
  description: string;

  @Column("simple-array")
  imageUrl: string[];

  @Column("int")
  stock: number;

  @ManyToMany(() => Order, order => order.products)
  orders?: Order[];

@OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
orderProducts: OrderProduct[];
}

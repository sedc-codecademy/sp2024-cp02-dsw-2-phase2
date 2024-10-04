// import { Category } from 'src/categories/entities/category.entity';
import { Category } from 'src/categories/entities/category.entity';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column("int")
  price?: number;

  @Column("int", { nullable: true })
  discountPrice?: number;

  @Column()
  isOnDiscount?: boolean;

  @Column({ nullable: true })
  image?: string;

  @Column("text", { nullable: true })
  description?: string;

  @Column("simple-array")
  imageUrl?: string[];

  @Column("int")
  stock?: number;

  @ManyToMany(() => Order, order => order.products)
  orders?: Order[];

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProducts?: OrderProduct[];

  //go dodav ova za kategorite
  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'categoryId' })
  category?: Category;

  // @Column({ nullable: true })
  // categoryId?: number;
}

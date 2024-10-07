import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("int")
  quantity: number;

  @Column("decimal")
  total_price: number;

  @Column()
  customer_name: string;

  @Column()
  customer_email: string;

  @Column("text", { nullable: true })
  notes?: string;


  @ManyToMany(() => Product, product => product.orders)
  @JoinTable()
  products: Product[];
  
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, { cascade: true })
  order_products: OrderProduct[];

  // @ManyToOne(() => User, (user) => user.orders)
  // @JoinColumn()
  // user: User;
}



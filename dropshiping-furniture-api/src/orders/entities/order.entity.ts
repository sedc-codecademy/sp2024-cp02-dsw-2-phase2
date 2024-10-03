import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // productId: number;

  @Column('int')
  quantity: number;

  @Column('decimal')
  totalPrice: number;

  @Column()
  customerName: string;

  @Column()
  customerEmail: string;

  @Column('text', { nullable: true })
  notes?: string;

  @ManyToMany(() => Product, product => product.orders)
  @JoinTable()
  products: Product[];
  
  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order, { cascade: true })
  orderProducts: OrderProduct[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;
}



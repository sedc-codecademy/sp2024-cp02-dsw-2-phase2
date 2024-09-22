import { Product } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

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
}


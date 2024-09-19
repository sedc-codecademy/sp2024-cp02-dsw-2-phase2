import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column('int')
  price: number;

  @Column('int', { nullable: true }) 
  discountPrice: number;

  @Column()
  isOnDiscount: boolean;

  @Column()
  image: string;

  @Column('text', { nullable: true }) 
  description: string;

  @Column('simple-array')
  imageUrl: string[];

  @Column('int')
  stock: number;
}


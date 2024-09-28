import { Product } from "src/product/entities/product.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Category {
    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column()
    category: string;

    //
    @OneToMany(() => Product, product => product.categoryId)
  products?: Product[];
}

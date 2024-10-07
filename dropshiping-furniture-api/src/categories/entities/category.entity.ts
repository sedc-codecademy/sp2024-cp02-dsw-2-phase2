import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column( { nullable: true })
    category_name: string;

    @OneToMany(() => Product, product => product.category)
  products?: Product[];
}

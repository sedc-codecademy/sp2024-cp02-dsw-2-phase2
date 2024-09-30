import { Order } from 'src/orders/entities/order.entity';
import { Role } from 'src/util/role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
  })
  role: Role;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}

import {
  Table,
  Column,
  Model,
  DataType,
  Sequelize,
  BelongsToMany,
} from 'sequelize-typescript';
import { Order, ProductOrder } from '.';

@Table
export class Product extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: Sequelize.literal('gen_random_uuid()'),
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  quantity: number;

  @Column({
    type: DataType.DATE,
  })
  createdAt: string;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: string;

  @BelongsToMany(() => Order, () => ProductOrder)
  orders: Order[];
}

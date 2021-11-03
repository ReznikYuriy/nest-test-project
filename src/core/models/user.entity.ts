import {
  Table,
  Column,
  Model,
  DataType,
  Sequelize,
  HasMany,
} from 'sequelize-typescript';
import { Order } from '../models';

@Table
export class User extends Model {
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
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  })
  gender: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt: string;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: string;

  @HasMany(() => Order, 'userId')
  readonly orders: Order[];
}

import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Order, Product } from '.';

@Table
export class ProductOrder extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => Product)
  @Column
  productId: string;

  @ForeignKey(() => Order)
  @Column
  orderId: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt: string;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: string;
}

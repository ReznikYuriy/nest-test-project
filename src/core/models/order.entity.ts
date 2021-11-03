import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { Product, ProductOrder, User } from '.';

@Table
export class Order extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt: string;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsToMany(() => Product, () => ProductOrder)
  products: Product[];
}

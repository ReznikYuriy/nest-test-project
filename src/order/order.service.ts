import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY, PRODUCT_ORDER_REPOSITORY } from 'src/core/constants';
import { Order, Product, ProductOrder, User } from 'src/core/models';
import { OrderDto, ProductOrderDto } from './dto';
// import { IOrder } from './interfaces';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
    @Inject(PRODUCT_ORDER_REPOSITORY)
    private readonly productOrderRepository: typeof ProductOrder,
  ) {}

  async create(order: OrderDto, userId): Promise<Order> {
    return await this.orderRepository.create({ ...order, userId });
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
        },
        { model: Product, attributes: ['name', 'price'] },
      ],
    });
  }

  async findOne(id: string): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id: string, userId: string) {
    return await this.orderRepository.destroy({ where: { id, userId } });
  }

  async update(id: string, data: OrderDto, userId: string) {
    const [numberOfAffectedRows, [updatedOrder]] =
      await this.orderRepository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );

    return { numberOfAffectedRows, updatedOrder };
  }

  async addProductToOrder(prodOrder: ProductOrderDto): Promise<ProductOrder> {
    return await this.productOrderRepository.create(prodOrder);
  }
}

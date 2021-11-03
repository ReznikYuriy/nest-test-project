import { Inject, Injectable } from '@nestjs/common';
import { ORDER_REPOSITORY } from 'src/core/constants';
import { Order, User } from 'src/core/models';
import { OrderDto } from './dto';
// import { IOrder } from './interfaces';

@Injectable()
export class OrderService {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order,
  ) {}

  async create(order: OrderDto, userId): Promise<Order> {
    return await this.orderRepository.create({ ...order, userId });
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.findAll({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
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
}

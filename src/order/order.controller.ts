import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Order, ProductOrder } from 'src/core/models';
import { OrderDto, ProductOrderDto } from './dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    const order = await this.orderService.findOne(id);

    if (!order) {
      throw new NotFoundException("This Order doesn't exist");
    }
    return order;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() order: OrderDto, @Request() req): Promise<Order> {
    return await this.orderService.create(order, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() order: OrderDto,
    @Request() req,
  ): Promise<Order> {
    const { numberOfAffectedRows, updatedOrder } =
      await this.orderService.update(id, order, req.user.id);

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Order doesn't exist");
    }

    return updatedOrder;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    const deleted = await this.orderService.delete(id, req.user.id);

    if (deleted === 0) {
      throw new NotFoundException("This Order doesn't exist");
    }
    return 'Successfully deleted';
  }

  @Post('add_prod')
  async addProdToOrder(
    @Body() prodOrder: ProductOrderDto,
  ): Promise<ProductOrder> {
    return await this.orderService.addProductToOrder(prodOrder);
  }
}

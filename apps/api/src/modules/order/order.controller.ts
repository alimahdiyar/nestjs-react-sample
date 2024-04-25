import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { AuthUser } from 'src/core/decoraters/auth.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post()
  createOrder(
    @AuthUser('sub') userId: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.createOrder(createOrderDto, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateOrder(
    @Param('id') orderId: number,
    @AuthUser('sub') userId: number,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(orderId, userId, updateOrderDto);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getOrderById(
    @Param('id') orderId: number,
    @AuthUser('sub') userId: number,
  ) {
    return this.orderService.getOrderById(orderId, userId);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteOrder(
    @Param('id') orderId: number,
    @AuthUser('sub') userId: number,
  ) {
    return this.orderService.deleteOrder(orderId, userId);
  }
}

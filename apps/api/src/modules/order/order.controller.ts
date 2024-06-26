import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, PatchOrderDto } from './dto';
import { AuthGuard } from 'core/guards/auth.guard';
import { AuthUser } from 'core/decoraters/auth.decorator';
import { PaginationDto } from 'core/dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Get()
  getUserOrders(
    @AuthUser('sub') userId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    const { page, pageSize } = paginationDto;
    return this.orderService.getUserOrders(userId, page, pageSize);
  }

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
  async patchOrder(
    @Param('id') orderId: number,
    @AuthUser('sub') userId: number,
    @Body() updateOrderDto: PatchOrderDto,
  ) {
    return this.orderService.patchOrder(orderId, userId, updateOrderDto);
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

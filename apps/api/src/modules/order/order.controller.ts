import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get(':id')
  getOrderById(@Param('id') id: number) {
    return this.orderService.getOrderById(id);
  }

  @Put(':id')
  updateOrder(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }
}

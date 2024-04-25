import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto';
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
}

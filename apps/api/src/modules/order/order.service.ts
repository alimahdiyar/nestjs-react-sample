import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  async createOrder(dto: CreateOrderDto, userId: number) {
    return this.prisma.order.create({
      data: {
        ...dto,
        userId,
        items: {
          createMany: {
            data: dto.items,
          },
        },
      },
    });
  }

  async updateOrder(orderId: number, userId: number, dto: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.userId !== userId) {
      throw new UnauthorizedException(
        'You do not have permission to update this order',
      );
    }

    return this.prisma.order.update({
      where: { id: orderId },
      data: {
        ...dto,
        items: {
          updateMany: dto.items.map((item) => ({
            where: { productId: item.productId },
            data: item,
          })),
        },
      },
    });
  }

  async getOrderById(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true, // Include items in the results
      },
    });
  }

  async deleteOrder(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}

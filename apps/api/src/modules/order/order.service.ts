import { Injectable, UseGuards } from '@nestjs/common';
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

  async updateOrder(id: number, dto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: {
        ...dto,
        items: {
          updateMany: dto.items.map((item) => ({
            where: { productName: item.productName },
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

import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  @UseGuards(AuthGuard)
  async createOrder(dto: CreateOrderDto) {
    return this.prisma.order.create({
      data: {
        ...dto,
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
          updateMany: {
            data: dto.items,
          },
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

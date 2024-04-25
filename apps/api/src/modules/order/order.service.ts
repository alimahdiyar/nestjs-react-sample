import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

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
    return this.prisma.$transaction(async (prisma) => {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      if (!order || order.userId !== userId) {
        throw new NotFoundException('Order not found');
      }

      // Update items: check if each item needs to be updated or created
      const itemUpdates = dto.items.map(async (itemDto) => {
        const existingItem = order.items.find(
          (item) => item.productId === itemDto.productId,
        );

        if (existingItem) {
          // Update existing item
          return prisma.item.update({
            where: { id: existingItem.id },
            data: { quantity: itemDto.quantity },
          });
        } else {
          // Create new item
          return prisma.item.create({
            data: {
              productId: itemDto.productId,
              quantity: itemDto.quantity,
              orderId: orderId,
            },
          });
        }
      });

      // Execute all item updates
      await Promise.all(itemUpdates);

      // Optionally handle the removal of items not listed in the DTO if required
      // ...

      return prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });
    });
  }

  async getOrderById(orderId: number, userId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order || order.userId !== userId) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async deleteOrder(orderId: number, userId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order || order.userId !== userId) {
      throw new NotFoundException('Order not found');
    }

    return this.prisma.order.delete({
      where: { id: orderId },
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async getAllProducts() {
    return {
      data: await this.prisma.product.findMany(),
    };
  }
}

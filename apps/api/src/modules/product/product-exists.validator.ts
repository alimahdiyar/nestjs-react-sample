import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust the import path as necessary

@ValidatorConstraint({ name: 'ProductExists', async: true })
@Injectable() // This allows the class to be injected with other services like PrismaService
export class ProductExistsConstraint implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  async validate(productId: number, args: ValidationArguments) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    return Boolean(product);
  }

  defaultMessage(args: ValidationArguments) {
    return `Product with ID ${args.value} does not exist.`;
  }
}

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'modules/prisma/prisma.service';

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

export function ProductExists(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ProductExistsConstraint,
    });
  };
}

// validators/is-unique-product.validator.ts
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class HasUniqueProductsConstraint
  implements ValidatorConstraintInterface
{
  validate(items: any[], args: ValidationArguments): boolean {
    const productIds = items.map((item) => item.productId);
    return new Set(productIds).size === productIds.length; // Checks if there are any duplicates
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Product IDs must be unique within the order.';
  }
}

export function HasUniqueProducts(validationOptions?: ValidationOptions) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: HasUniqueProductsConstraint,
    });
  };
}

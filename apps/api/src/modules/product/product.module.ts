import { Module } from '@nestjs/common';
import { ProductExistsConstraint } from './product-exists.validator';
import { HasUniqueProductsConstraint } from './has-unique-products.validator';

@Module({
  providers: [ProductExistsConstraint, HasUniqueProductsConstraint],
  exports: [ProductExistsConstraint, HasUniqueProductsConstraint],
})
export class ProductModule {}

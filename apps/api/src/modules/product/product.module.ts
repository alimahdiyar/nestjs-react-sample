import { Module } from '@nestjs/common';
import { ProductExistsConstraint } from 'src/modules/product/product-exists.validator';
import { HasUniqueProductsConstraint } from 'src/modules/product/has-unique-products.validator';

@Module({
  providers: [ProductExistsConstraint, HasUniqueProductsConstraint],
  exports: [ProductExistsConstraint, HasUniqueProductsConstraint],
})
export class ProductModule {}

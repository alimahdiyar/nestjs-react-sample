import { Module } from '@nestjs/common';
import { ProductExistsConstraint } from './product-exists.validator';
import { HasUniqueProductsConstraint } from './has-unique-products.validator';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductExistsConstraint,
    HasUniqueProductsConstraint,
  ],
  exports: [
    ProductService,
    ProductExistsConstraint,
    HasUniqueProductsConstraint,
  ],
})
export class ProductModule {}

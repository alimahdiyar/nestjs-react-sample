import { Module } from '@nestjs/common';
import { ProductExistsConstraint } from 'src/modules/product/product-exists.validator';

@Module({
  providers: [ProductExistsConstraint],
  exports: [ProductExistsConstraint],
})
export class ProductModule {}

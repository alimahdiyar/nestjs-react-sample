import { Controller, Get } from '@nestjs/common';
import { ProductService } from 'src/modules/product/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAllProducts();
  }
}

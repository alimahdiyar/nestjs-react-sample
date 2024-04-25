import { IsArray, IsNumber, Validate, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductExistsConstraint } from 'src/modules/product/product-exists.validator';

class ItemDto {
  @IsNumber()
  @Validate(ProductExistsConstraint)
  productId: number;

  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}

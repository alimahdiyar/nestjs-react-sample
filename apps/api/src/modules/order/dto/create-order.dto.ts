import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductExists } from '../../product/product-exists.validator';
import { HasUniqueProducts } from '../../product/has-unique-products.validator';

class ItemDto {
  @IsNumber()
  @ProductExists()
  productId: number;

  @IsNumber()
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  @HasUniqueProducts()
  items: ItemDto[];

  @IsString()
  @IsNotEmpty()
  customerName: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}

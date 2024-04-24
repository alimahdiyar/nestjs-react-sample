import {
  IsString,
  IsDate,
  IsArray,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class ItemDto {
  @IsString()
  productName: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  pricePerUnit: number;
}

export class CreateOrderDto {
  @IsString()
  customerName: string;

  @IsString()
  address: string;

  @IsDate()
  orderDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}

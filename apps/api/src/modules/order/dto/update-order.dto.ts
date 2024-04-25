import { IsInt, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}

export class UpdateOrderDto {
  // @IsOptional()
  // @IsDate()
  // deliveryDate?: Date;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateItemDto)
  items?: UpdateItemDto[];
}

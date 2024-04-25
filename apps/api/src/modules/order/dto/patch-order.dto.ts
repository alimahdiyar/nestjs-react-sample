import { CreateOrderDto } from 'src/modules/order/dto/create-order.dto';
import { PartialType } from '@nestjs/mapped-types';

export class PatchOrderDto extends PartialType(CreateOrderDto) {}

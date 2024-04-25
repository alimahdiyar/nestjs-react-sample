import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CoreModule } from './core/core.module';
import { OrderModule } from 'src/modules/order/order.module';
import { ProductModule } from 'src/modules/product/product.module';

@Module({
  imports: [
    ProductModule,
    OrderModule,
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

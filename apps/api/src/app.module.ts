import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CoreModule } from './core/core.module';
import { OrderModule } from 'src/modules/order/order.module';

@Module({
  imports: [
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

import {MiddlewareConsumer, Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { CoreModule } from './core/core.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}

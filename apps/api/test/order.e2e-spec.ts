import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'app.module';
import { PrismaService } from 'modules/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { setupApp } from 'main';
import { AuthGuard } from 'core/guards/auth.guard';
import { MockAuthGuard } from 'common/mock-auth.guard';
import { UserService } from 'core/user/user.service';
import { ProductService } from 'modules/product/product.service';

describe('OrderController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard) // or whatever guard you are using
      .useClass(MockAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication() as INestApplication;
    await setupApp(app);
    await app.init();
    prismaService = app.get(PrismaService);

    const userService = app.get(UserService);
    const userExists = await userService.findOne('a@b.com');
    if (!userExists) {
      await userService.createUserAsync('a@b.com', 'a', 'abcd@1234');
    }

    const productService = app.get(ProductService);
    const productExists =
      (await productService.getAllProducts()).data.length > 0;
    if (!productExists) {
      await prismaService.product.create({
        data: { name: 'Product 1', pricePerUnit: 15.5 },
      });
    }
  });

  it('POST /orders - Create order', async () => {
    const orderData = {
      items: [{ productId: 1, quantity: 2 }],
      customerName: 'a',
      address: 'aaaaaa',
    };
    return request(app.getHttpServer())
      .post('/api/v1/orders')
      .send(orderData)
      .expect(201);
  });

  afterEach(async () => {
    await app.close();
  });
});

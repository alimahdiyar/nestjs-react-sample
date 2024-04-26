import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { setupApp } from '../src/main';
import { AuthGuard } from '../src/core/guards/auth.guard';
import { MockAuthGuard } from '../src/common/mock-auth.guard';

describe('OrderController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let token: string;

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

    await prismaService.product.createMany({
      data: [
        { name: 'Product 1', pricePerUnit: 10.0 },
        { name: 'Product 2', pricePerUnit: 15.5 },
      ],
    });
  });

  it('POST /orders - Create order', async () => {
    const orderData = {
      items: [{ productId: 1, quantity: 2 }],
    };
    // jest.mock('../src/modules/prisma/prisma.service', () => ({
    //   PrismaService: jest.fn().mockImplementation(() => ({
    //     canActivate: jest.fn(() => true),
    //   })),
    // }));
    return request(app.getHttpServer())
      .post('/api/v1/orders')
      .send(orderData)
      .expect(201);
  });

  afterEach(async () => {
    await app.close();
  });
});

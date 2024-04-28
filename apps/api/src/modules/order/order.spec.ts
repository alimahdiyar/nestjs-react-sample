import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from 'app.module';
import { PrismaService } from '../prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { setupApp } from 'main';
import { AuthGuard } from 'core/guards/auth.guard';
import { MockAuthGuard } from 'common/mock-auth.guard';

describe('OrderController', () => {
  let app: INestApplication;

  const mockPrismaService = {
    order: {
      create: jest.fn(),
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .overrideGuard(AuthGuard) // or whatever guard you are using
      .useClass(MockAuthGuard)
      .compile();

    app = moduleFixture.createNestApplication() as INestApplication;
    await setupApp(app);
    await app.init();
  });

  it('POST /orders - Create order', async () => {
    const orderData = {
      items: [{ productId: 1, quantity: 2 }],
      customerName: 'a',
      address: 'aaaaaa',
    };
    jest.spyOn(mockPrismaService.order, 'create');
    await request(app.getHttpServer())
      .post('/api/v1/orders')
      .send(orderData)
      .expect(201);
    expect(mockPrismaService.order.create).toBeCalledWith({
      data: {
        ...orderData,
        userId: MockAuthGuard.userId,
        items: {
          createMany: {
            data: orderData.items,
          },
        },
      },
    });
  });

  afterEach(async () => {
    await app.close();
  });
});

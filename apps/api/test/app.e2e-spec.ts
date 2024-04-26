import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { AuthService } from '../src/core/auth/auth.service';
import { setupApp } from '../src/main';

describe('OrderController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

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

    const authService = app.get(AuthService);
    const email = 'aaa133q@ba.com';
    const password = '12341234';
    await authService.signUp(email, 'a', password);
    token = await authService.signIn(email, password);
  });

  it('POST /orders - Create order', async () => {
    console.log({ token });
    const orderData = {
      items: [{ productId: 1, quantity: 2 }],
    };
    return request(app.getHttpServer())
      .post('/api/v1/orders')
      .set('Cookie', `token=${token};`)
      .send(orderData)
      .expect(201);
  });

  // it('GET /orders/:id - Get order', async () => {
  //   const orderId = 1;
  //   return request(app.getHttpServer())
  //     .get(`/orders/${orderId}`)
  //     .expect(200)
  //     .expect({
  //       id: orderId,
  //       customerName: 'John Doe',
  //       address: '1234 Test St',
  //       items: [{ productId: 1, quantity: 2 }],
  //     });
  // });
  //
  // it('PUT /orders/:id - Update order', async () => {
  //   const orderId = 1;
  //   const updateData = {
  //     customerName: 'Jane Doe',
  //   };
  //   return request(app.getHttpServer())
  //     .put(`/orders/${orderId}`)
  //     .send(updateData)
  //     .expect(200)
  //     .expect({
  //       id: orderId,
  //       ...updateData,
  //     });
  // });
  //
  // it('DELETE /orders/:id - Delete order', async () => {
  //   const orderId = 1;
  //   return request(app.getHttpServer())
  //     .delete(`/orders/${orderId}`)
  //     .expect(200);
  // });

  afterEach(async () => {
    await app.close();
  });
});

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BooksModule } from './books/books.module';
import { LoggerService } from './logger/logger.service';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.moudle';
import { CustomerModule } from './customer/customer.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtGuard } from './utils /gaurds/jwt.gaurd';
import { RolesGuard } from './utils /gaurds/roles.guard';
import { RequestResponseInterceptor } from './utils /interceptors/request-response.interceptor';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule,
    PrismaModule,
    BooksModule,
    OrdersModule,
    UsersModule,
    AuthModule,
    CustomerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    LoggerService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestResponseInterceptor,
    },
  ],
})
export class AppModule {}

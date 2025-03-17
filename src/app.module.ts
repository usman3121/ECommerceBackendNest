import { Module, NestModule,MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { CurrentUserMiddleware } from './utilities/middleware/current-user.middleware';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';

@Module({
  imports: [ProductsModule,TypeOrmModule.forRoot(dataSourceOptions), CategoriesModule, UsersModule, OrderModule, OrderItemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {


    consumer
      .apply(CurrentUserMiddleware)
      .exclude(
        { path: 'users/signup', method: RequestMethod.POST },
        { path: 'users/signin', method: RequestMethod.POST }
      )
      .forRoutes({path : '*',method: RequestMethod.ALL});
  }
}

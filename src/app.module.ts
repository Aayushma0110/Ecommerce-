import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './order/order.module';
import { UsersModule } from './user/user.modules';
import { UploadModule } from './upload/upload.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/config';
@Module({
  imports: [
    ConfigModule. forRoot ({
      isGlobal:true,
      load:[config],
    }),
    TypeOrmModule.forRoot({

//@ts-ignore
      type:config().database.dbType,
      host:config().database.host, 
      port:config() .database.port,
      username:config(). database.username,
      password: config(). database.password,
      autoLoadEntities: true,
      database: config().database.databaseName,
      synchronize: true,
    }),
    OrdersModule,
    ProductModule,
    UsersModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

function forRoot(arg0: { isGlobal: boolean; load: any[]; }): import("@nestjs/common").Type<any> | import("@nestjs/common").DynamicModule | Promise<import("@nestjs/common").DynamicModule> | import("@nestjs/common").ForwardReference<any> {
  throw new Error('Function not implemented.');
}
//user create

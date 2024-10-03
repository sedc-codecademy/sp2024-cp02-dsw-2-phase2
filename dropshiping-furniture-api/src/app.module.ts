import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/assets/data/images'), 
      serveRoot: '/images', 
    }),
    CategoriesModule,
    ProductModule,
    OrdersModule,
  
    ContactModule,
    DatabaseModule,
    AuthModule,
  
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

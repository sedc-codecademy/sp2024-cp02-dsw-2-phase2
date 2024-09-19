import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    
    ConfigModule.forRoot({
      
      isGlobal: true, 
      envFilePath: '.env', 

    }),
    CategoriesModule, ProductModule, OrdersModule, UsersModule, ContactModule, DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}

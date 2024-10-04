import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductModule } from './product/product.module';
import { OrdersModule } from './orders/orders.module';
// import { UsersModule } from './users/users.module';
import { ContactModule } from './contact/contact.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';



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
    // UsersModule,
    ContactModule,
    DatabaseModule,

    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        }
      }
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

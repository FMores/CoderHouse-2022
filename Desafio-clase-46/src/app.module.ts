import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductSchema } from './product/DTOs/product.schema';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';
import { MessageSchema } from './messages/DTOs/messages.schema';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { LoggerMiddleware } from './utils/logger.middleware';
import { HomeService } from './home/home.service';
import { HomeController } from './home/home.controller';
import { ChatGateway } from './chat/chat.gateway';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    AuthModule,
    // Crea la conexion a mongoDB
    MongooseModule.forRoot(process.env.MONGO_ATLAS_SRV),
    // Hacemos disponibles cada esquema que sea creado (products, cart, messajes, etc.)
    // Ej.: Voy a crear una entidad "Product" basada en el esquema "ProductSchema"
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Message', schema: MessageSchema },
    ]),
  ],
  controllers: [
    ProductController,
    MessagesController,
    UsersController,
    HomeController,
  ],
  providers: [
    ProductService,
    MessagesService,
    AuthService,
    HomeService,
    ChatGateway,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

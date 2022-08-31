import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductSchema } from './product/DTOs/product.schema';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    // Crea la conexion a mongoDB
    MongooseModule.forRoot(process.env.MONGO_ATLAS_SRV),
    // Hacemos disponibles cada esquema que sea creado (products, cart, messajes, etc.)
    // Ej.: Voy a crear una entidad "Product" basada en el esquema "ProductSchema"
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply().forRoutes(ProductController);
  }
}

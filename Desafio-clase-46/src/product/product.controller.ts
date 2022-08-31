import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import {
  CreateProductDTO,
  ProductDTO,
  UpdateProductDTO,
} from './DTOs/product.dto';
import { ProductService } from './product.service';

// Dentro de @Controller se define la ruta para comunicarnos con el controller desde POSTMAN o CLIENT
@Controller('api/product')
export class ProductController {
  /**
   * Para poder utilizar el service de books, debemos inicializar el servicio dentro del constructor
   */
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<ProductDTO[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') idProduct: string): Promise<ProductDTO> {
    return this.productService.getProductById(idProduct);
  }

  /*
   * Para que class-validator, utilizado en book.controller, se debe agregar @UsePipes(ValidationPipe)
   * De lo contrario la validacion no se realiza y los datos del body no son verificados.
   */
  @Post()
  @UsePipes(ValidationPipe)
  createProduct(@Body() product: CreateProductDTO): Promise<ProductDTO> {
    return this.productService.addProduct(product);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateProduct(
    @Param('id') idProduct: string,
    @Body() product: UpdateProductDTO,
  ): Promise<ProductDTO> {
    return this.productService.updateProduct(idProduct, product);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  deleteProduct(@Param('id') idProduct: string): Promise<ProductDTO> {
    return this.productService.deleteProduct(idProduct);
  }
}

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
import { ProductDTO } from './DTOs/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  /**
   * Para poder utilizar el service de books, debemos inicializar el servicio dentro del constructor
   */
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<ProductDTO[]> {
    return this.productService.getProduct();
  }

  /*
   * Para que class-validator, utilizado en book.controller, se debe agregar @UsePipes(ValidationPipe)
   * De lo contrario la validacion no se realiza y los datos del body no son verificados.
   */
  @Post()
  @UsePipes(ValidationPipe)
  createBook(@Body() product: ProductDTO): Promise<ProductDTO> {
    return this.productService.addProduct(product);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  updateBook(
    @Param('id') idBook: string,
    @Body() book: ProductDTO,
  ): Promise<ProductDTO> {
    return this.productService.updateProduct(idBook, book);
  }

  @Delete(':id')
  @UsePipes(ValidationPipe)
  deleteBook(@Param('id') idProduct: string): Promise<ProductDTO> {
    return this.productService.deleteProduct(idProduct);
  }
}

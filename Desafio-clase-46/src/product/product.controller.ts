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
  Render,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/authenticated.guard';

import {
  CreateProductDTO,
  ProductDTO,
  UpdateProductDTO,
} from './DTOs/product.dto';
import { ProductService } from './product.service';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<ProductDTO[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') idProduct: string): Promise<ProductDTO> {
    return this.productService.getProductById(idProduct);
  }

  @UseGuards(AuthenticatedGuard)
  @Post()
  @UsePipes(ValidationPipe)
  createProduct(@Body() product: CreateProductDTO): Promise<ProductDTO> {
    return this.productService.addProduct(product);
  }

  @UseGuards(AuthenticatedGuard)
  @Put(':id')
  @UsePipes(ValidationPipe)
  updateProduct(
    @Param('id') idProduct: string,
    @Body() product: UpdateProductDTO,
  ): Promise<ProductDTO> {
    return this.productService.updateProduct(idProduct, product);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  @UsePipes(ValidationPipe)
  deleteProduct(@Param('id') idProduct: string): Promise<ProductDTO> {
    return this.productService.deleteProduct(idProduct);
  }
}

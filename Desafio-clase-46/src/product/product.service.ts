import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Model } from 'mongoose';
import { ProductDTO } from './DTOs/product.dto';

@Injectable()
export class ProductService {
  // Inyectamos la entidad/modelo "product" creado en app.module.ts
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductDTO>,
  ) {}

  // @ApiOperation y @ApiResponse tienen la funcion de describir la operecion para que swagger
  // puega generar la documentacion en base a esos datos.

  /**
   * -----------------------------------------------
   * ------------------- GET ALL -------------------
   * -----------------------------------------------
   */
  @ApiOperation({
    description: 'Retorna un array de productos',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna un array de productos correctamente',
    type: ProductDTO,
  })
  async getAllProducts(): Promise<ProductDTO[]> {
    return await this.productModel.find();
  }

  /**
   * -----------------------------------------------
   * ------------------- GET BY ID -----------------
   * -----------------------------------------------
   */
  @ApiOperation({
    description: 'Retorna un producto buscando por id',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna el producto buscado correctamente',
    type: ProductDTO,
  })
  async getProductById(idProduct: string): Promise<ProductDTO> {
    return await this.productModel.findById(idProduct);
  }

  /**
   * -----------------------------------------------
   * -------------------- POST ---------------------
   * -----------------------------------------------
   */
  @ApiOperation({
    description: 'Agrega un producto a la DB',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna el producto creado.',
    type: ProductDTO,
  })
  async addProduct(product: ProductDTO): Promise<ProductDTO> {
    const newProduct = new this.productModel(product);
    newProduct.save();
    return newProduct;
  }

  /**
   * -----------------------------------------------
   * -------------------- PUT ----------------------
   * -----------------------------------------------
   */
  @ApiOperation({
    description: 'Actualiza un producto por su ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna el producto con el campo actualizado.',
    type: ProductDTO,
  })
  async updateProduct(
    idProduct: string,
    product: ProductDTO,
  ): Promise<ProductDTO> {
    return await this.productModel.findByIdAndUpdate(idProduct, product, {
      new: true,
    });
  }

  /**
   * -----------------------------------------------
   * ------------------- DELETE --------------------
   * -----------------------------------------------
   */
  @ApiOperation({
    description: 'Elimina un producto por ID.',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna el producto que se ha eliminado.',
    type: ProductDTO,
  })
  async deleteProduct(idProduct: string): Promise<ProductDTO> {
    const deleted = await this.productModel.findByIdAndDelete(idProduct, {
      new: true,
    });

    return deleted;
  }
}

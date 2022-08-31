import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isURL,
  IS_URL,
  Length,
} from 'class-validator';
import { link } from 'fs';

/**
 * class-validator es similar a joi para validad los datos que ingresan por el body.
 * Las lineas 24, 31, 39 y 46 hacen que el campo sea obligatorio.
 */

export class ProductDTO {
  // @ApiProperty({
  //   type: 'string',
  //   example: '630d84e64feb6cfff5ffa5c5',
  // })
  // readonly id: string;

  @ApiProperty({
    type: 'string',
    example: 'Frozen pizza',
  })
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: 'Photo-frozen-pizzaa',
  })
  readonly thumbnail: string;

  @ApiProperty({
    type: 'number',
    example: '2000',
  })
  readonly price: number;
}

export class CreateProductDTO {
  // Linea 10 a 13 es para que swagger cree la documentacion en base a la descripcon que nosotros le damos.
  // Lo mismo para los ejemplos siguientes

  @ApiProperty({
    type: 'string',
    example: 'Frozen pizza',
  })
  @IsString()
  @Length(5, 50)
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: 'Photo-frozen-pizzaa',
  })
  @IsString()
  readonly thumbnail: string;

  @ApiProperty({
    type: 'number',
    example: '2000',
  })
  @IsNumber()
  readonly price: number;
}

export class UpdateProductDTO {
  @ApiProperty({
    type: 'string',
    example: 'Frozen pizza',
  })
  @IsString()
  @Length(5, 50)
  @IsOptional()
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: 'Photo-frozen-pizzaa',
  })
  @IsString()
  @IsOptional()
  readonly thumbnail: string;

  @ApiProperty({
    type: 'number',
    example: '2000',
  })
  @IsNumber()
  @IsOptional()
  readonly price: number;
}

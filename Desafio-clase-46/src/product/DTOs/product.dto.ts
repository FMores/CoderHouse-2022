import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';

/**
 * class-validator es similar a joi para validad los datos que ingresan por el body.
 */

export class ProductDTO {
  // Linea 10 a 13 es para que swagger cree la documentacion en base a la descripcon que nosotros le damos.
  // Lo mismo para los ejemplos siguientes
  @ApiProperty({
    type: 'string',
    example: '630d84e64feb6cfff5ffa5c5',
  })
  readonly id: string;

  @ApiProperty({
    type: 'string',
    example: 'El señor de los anillos',
  })
  @IsNotEmpty()
  @Length(5, 50)
  readonly title: string;

  @ApiProperty({
    type: 'string',
    example: 'JRR Tolkien',
  })
  @IsNotEmpty()
  readonly author: string;

  @ApiProperty({
    type: 'number',
    example: '2000',
  })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
}

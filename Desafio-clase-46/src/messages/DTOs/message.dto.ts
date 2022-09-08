import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  isString,
  IsString,
  isURL,
  IS_URL,
  Length,
} from 'class-validator';

/**
 * class-validator es similar a joi para validad los datos que ingresan por el body.
 * Las lineas 24, 31, 39 y 46 hacen que el campo sea obligatorio.
 */

class Author {
  readonly email: string;
  readonly name: string;
  readonly surname: string;
  readonly alias: string;
  readonly age: number;
  readonly avatar: string;
}

export class MessageDTO {
  readonly author: Author;
  readonly text: string;
}

export class CreateMsgDTO {
  @ApiProperty({
    type: 'string',
    example: 'admin@admin.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    type: 'string',
    example: 'Fabricio',
  })
  @IsString()
  @Length(3, 50)
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: 'Mores',
  })
  @IsString()
  @Length(3, 50)
  readonly surname: string;

  @ApiProperty({
    type: 'string',
    example: 'Taquito',
  })
  @IsString()
  @Length(3, 50)
  readonly alias: string;

  @ApiProperty({
    type: 'string',
    example: 31,
  })
  @IsNumber()
  readonly age: number;

  @ApiProperty({
    type: 'string',
    example: 'url-avatar',
  })
  @IsString()
  readonly avatar: string;

  @ApiProperty({
    type: 'string',
    example: 'Hola, como estas?',
  })
  @IsString()
  readonly text: string;
}

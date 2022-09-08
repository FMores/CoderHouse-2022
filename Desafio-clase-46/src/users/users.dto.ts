import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

export class CreateUserDTO {
  // Linea 10 a 13 es para que swagger cree la documentacion en base a la descripcon que nosotros le damos.
  // Lo mismo para los ejemplos siguientes

  @ApiProperty({
    type: 'string',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  readonly _id: string;

  @ApiProperty({
    type: 'string',
    example: 'admin@gmail.com',
  })
  @IsString()
  readonly username: string;

  @ApiProperty({
    type: 'string',
    example: 'password-secret',
  })
  @IsString()
  @Length(5, 50)
  readonly password: string;
}

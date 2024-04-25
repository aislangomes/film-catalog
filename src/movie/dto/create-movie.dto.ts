import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: 'Star Wars', description: 'Nome do filme' })
  @IsString()
  @IsNotEmpty({ message: 'Digite um título valido.' })
  title: string;

  @ApiProperty({ example: '1977', description: 'Ano do filme' })
  @IsString()
  year: string;

  @ApiProperty({
    example: 'É um filme de ficção científica no espaço',
    description: 'Descrição do filme',
  })
  @IsString()
  description: string;
}

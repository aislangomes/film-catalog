import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty({ message: 'Digite um título valido.' })
  title: string;

  @IsString()
  year: string;

  @IsString()
  description: string;
}

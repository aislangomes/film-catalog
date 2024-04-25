import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  Matches,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,}$/;

export class CreateUserDto {
  @ApiProperty({ example: 'Cesar', description: 'Nome do usuário' })
  @IsString()
  @MinLength(2, { message: 'Nome precisa de pelo menos 5 letras' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'cesar@hotmail.com',
    description: 'Email do usuário',
  })
  @IsEmail({}, { message: 'Informe um email válido.' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'senHa00%',
    description: `
    Senha precisa conter:
    - Mínimo de 8 caracteres.
    - Uma letra maiuscula.
    - Uma letra minuscula.
    - Um número.
    - Um caractere especial.
     `,
  })
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `
    Senha precisa conter:
    - Mínimo de 8 caracteres.
    - Uma letra maiuscula.
    - Uma letra minuscula.
    - Um número.
    - Um caractere especial.
     `,
  })
  password: string;

  @ApiProperty({ description: 'Administradores tem acesso total a aplicaçã' })
  @IsNotEmpty()
  admin: boolean = false;
}

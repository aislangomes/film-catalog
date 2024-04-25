import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  Matches,
  IsBoolean,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export class CreateUserDto {
  @ApiProperty({ example: 'Cesar', description: 'Nome do usuário' })
  @IsString()
  @MinLength(2, { message: 'Nome precisa de pelo menos 2 letras' })
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
    A senha deve conter:
    - Pelo menos 8 caracteres.
    - Pelo menos uma letra maiúscula.
    - Pelo menos uma letra minúscula.
    - Pelo menos um número.
    - Pelo menos um caractere especial (@$!%*?&).
    `,
  })
  password: string;

  @ApiProperty({ description: 'Administradores tem acesso total a aplicaçã' })
  @IsBoolean()
  admin: boolean = false;
}

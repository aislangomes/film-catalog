import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  Matches,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$/;

export class CreateUserDto {
  @IsString()
  @MinLength(5, { message: 'Nome precisa de pelo menos 5 letras' })
  @IsNotEmpty()
  name: string;

  @IsEmail(null, { message: 'Informe um email válido.' })
  @IsNotEmpty()
  email: string;

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

  @IsNotEmpty()
  admin: boolean = false;
}

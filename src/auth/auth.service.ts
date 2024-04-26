import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async singIn(email: string, pass: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException({ message: 'Email ou senha inválido' });
    }
    const payload = { id: user.id, username: user.name, email: user.email };
    return {
      info: payload,
      acess_token: await this.jwtService.signAsync(payload),
    };
  }
}

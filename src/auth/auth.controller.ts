import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ApiOperation({ summary: 'Conecta o usuário e gera o token' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInUser: User) {
    return this.authService.singIn(signInUser.email, signInUser.password);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Confirma se o usuário está autenticado' })
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    const response = {
      perfil: req.user,
    };
    return response;
  }
}

import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('🔧 AuthController - Login recebido:', {
      email: loginDto.email,
    });
    try {
      const result = await this.authService.login(loginDto);
      console.log('✅ AuthController - Login bem-sucedido');
      return result;
    } catch (error) {
      console.error('❌ AuthController - Erro no login:', error.message);
      throw error;
    }
  }

  @Post('refresh')
  refresh(@Body() body: { refresh_token: string }) {
    try {
      const payload = this.jwtService.verify<{ sub: number; email: string }>(
        body.refresh_token,
        {
          secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
        },
      );
      // Gera novo access_token
      const access_token = this.jwtService.sign(
        { sub: payload.sub, email: payload.email },
        { expiresIn: process.env.JWT_EXPIRES_IN || '15m' },
      );
      // (Opcional) Gera novo refresh_token
      const refresh_token = this.jwtService.sign(
        { sub: payload.sub, email: payload.email },
        {
          expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
          secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
        },
      );
      return {
        access_token,
        refresh_token,
        expires_in: 60 * 60, // 1h em segundos
        user: { id: payload.sub, email: payload.email },
      };
    } catch (e) {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }
  }
}

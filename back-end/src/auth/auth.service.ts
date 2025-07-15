import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Não retornar a senha
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }
    const payload = { sub: user.id, email: user.email };

    // Token de acesso (curto prazo)
    const access_token = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    });

    // Refresh token (longo prazo)
    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
      secret: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    });

    // (Opcional) Salvar refresh_token no banco

    // Calcular tempo de expiração em segundos
    const expiresIn = process.env.JWT_EXPIRES_IN || '15m';
    const expiresInSeconds = expiresIn.includes('m')
      ? parseInt(expiresIn) * 60
      : parseInt(expiresIn);

    return {
      access_token,
      refresh_token,
      expires_in: expiresInSeconds,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }
}

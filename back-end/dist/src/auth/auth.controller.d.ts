import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private readonly authService;
    private readonly jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        expires_in: number;
        user: {
            id: number;
            email: string;
            name: string;
        };
    }>;
    refresh(body: {
        refresh_token: string;
    }): {
        access_token: string;
        refresh_token: string;
        expires_in: number;
        user: {
            id: number;
            email: string;
        };
    };
}

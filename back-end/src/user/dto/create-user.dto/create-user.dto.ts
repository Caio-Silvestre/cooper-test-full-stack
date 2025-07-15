import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

// DTO para criação de usuário
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

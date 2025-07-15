import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

// DTO para criação de tarefa
export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}

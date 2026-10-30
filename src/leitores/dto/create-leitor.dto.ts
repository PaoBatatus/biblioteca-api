import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateLeitorDto {
  @IsNotEmpty({ message: 'O nome do leitor não pode estar vazio.' })
  @IsString()
  @MaxLength(255)
  nome: string;

  @IsNotEmpty({ message: 'A matrícula não pode estar vazia.' })
  @IsString()
  @MaxLength(50)
  matricula: string;

  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  email: string;
}
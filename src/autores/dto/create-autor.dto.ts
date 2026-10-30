import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAutorDto {
  @IsNotEmpty({ message: 'O nome do autor não pode estar vazio.' })
  @IsString()
  @MaxLength(255)
  nome: string;

  @IsOptional()
  @IsString()
  biografia?: string;
}
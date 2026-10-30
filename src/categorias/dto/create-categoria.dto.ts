import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty({ message: 'O nome da categoria não pode estar vazio.' })
  @IsString()
  @MaxLength(100)
  nome: string;
}
import { IsNotEmpty, IsNumber, IsString, MaxLength, Min } from 'class-validator';

export class CreateLivroDto {
  @IsNotEmpty({ message: 'O título do livro não pode estar vazio.' })
  @IsString()
  @MaxLength(255)
  titulo: string;

  @IsNotEmpty({ message: 'O ISBN não pode estar vazio.' })
  @IsString()
  @MaxLength(50)
  isbn: string;

  @IsNotEmpty({ message: 'A quantidade total não pode estar vazia.' })
  @IsNumber({}, { message: 'A quantidade deve ser um número inteiro.' })
  @Min(1, { message: 'A quantidade total deve ser de pelo menos 1 exemplar.' })
  quantidade_total: number;

  @IsNotEmpty({ message: 'O ID do autor não pode estar vazio.' })
  @IsNumber({}, { message: 'O ID do autor deve ser um número.' })
  autor_id: number;

  @IsNotEmpty({ message: 'O ID da categoria não pode estar vazio.' })
  @IsNumber({}, { message: 'O ID da categoria deve ser um número.' })
  categoria_id: number;
}
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEmprestimoDto {
  @IsNotEmpty({ message: 'O ID do livro não pode estar vazio.' })
  @IsNumber({}, { message: 'O ID do livro deve ser um número.' })
  livro_id: number;

  @IsNotEmpty({ message: 'O ID do leitor não pode estar vazio.' })
  @IsNumber({}, { message: 'O ID do leitor deve ser um número.' })
  leitor_id: number;
}
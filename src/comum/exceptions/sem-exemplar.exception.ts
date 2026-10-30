import { HttpException, HttpStatus } from '@nestjs/common';

export class SemExemplarException extends HttpException {
  constructor(mensagem = 'Não há exemplares disponíveis deste livro para empréstimo.') {
    super(
      {
        status: HttpStatus.CONFLICT,
        codigo: 'SEM_EXEMPLAR',
        mensagem,
      },
      HttpStatus.CONFLICT,
    );
  }
}
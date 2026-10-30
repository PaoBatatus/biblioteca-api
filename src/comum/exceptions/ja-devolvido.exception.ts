import { HttpException, HttpStatus } from '@nestjs/common';

export class JaDevolvidoException extends HttpException {
  constructor(mensagem = 'Este empréstimo já foi devolvido.') {
    super(
      {
        status: HttpStatus.CONFLICT,
        codigo: 'JA_DEVOLVIDO',
        mensagem,
      },
      HttpStatus.CONFLICT,
    );
  }
}
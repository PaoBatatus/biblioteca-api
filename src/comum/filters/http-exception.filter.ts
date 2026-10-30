import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let erroObj: any = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      codigo: 'ERRO_INTERNO',
      mensagem: 'Erro interno no servidor.',
    };

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        erroObj = {
          status,
          codigo: (exceptionResponse as any).codigo || 'ERRO_NEGOCIO',
          mensagem: (exceptionResponse as any).mensagem || (exceptionResponse as any).message || exception.message,
        };
      } else {
        erroObj = {
          status,
          codigo: 'ERRO',
          mensagem: exceptionResponse,
        };
      }
    } else {
      console.error('Erro Inesperado (500):', exception);
    }

    response.status(status).json({
      sucesso: false,
      erro: erroObj,
      caminho: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
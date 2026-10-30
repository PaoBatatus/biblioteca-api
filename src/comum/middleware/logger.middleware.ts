import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start;
      console.log(`[HTTP] ${method} ${originalUrl} - Status: ${statusCode} - ${duration}ms`);
    });

    next();
  }
}
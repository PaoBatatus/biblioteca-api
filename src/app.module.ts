import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutoresModule } from './autores/autores.module.js';
import { CategoriasModule } from './categorias/categorias.module.js';
import { LivrosModule } from './livros/livros.module.js';
import { LeitoresModule } from './leitores/leitores.module.js';
import { EmprestimosModule } from './emprestimos/emprestimos.module.js';
import { LoggerMiddleware } from './comum/middleware/logger.middleware.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3' as any,
      database: 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AutoresModule,
    CategoriasModule,
    LivrosModule,
    LeitoresModule,
    EmprestimosModule,
  ],
})
class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

export { AppModule };
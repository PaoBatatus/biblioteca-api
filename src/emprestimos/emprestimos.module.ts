import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmprestimosService } from './emprestimos.service.js';
import { EmprestimosController } from './emprestimos.controller.js';
import { Emprestimo } from './entities/emprestimo.entity.js';
import { LivrosModule } from '../livros/livros.module.js';
import { LeitoresModule } from '../leitores/leitores.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Emprestimo]),
    LivrosModule,
    LeitoresModule,
  ],
  controllers: [EmprestimosController],
  providers: [EmprestimosService],
  exports: [EmprestimosService],
})
export class EmprestimosModule {}
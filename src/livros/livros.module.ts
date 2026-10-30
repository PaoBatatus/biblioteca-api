import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivrosService } from './livros.service.js';
import { LivrosController } from './livros.controller.js';
import { Livro } from './entities/livro.entity.js';
import { AutoresModule } from '../autores/autores.module.js';
import { CategoriasModule } from '../categorias/categorias.module.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Livro]),
    AutoresModule,
    CategoriasModule,
  ],
  controllers: [LivrosController],
  providers: [LivrosService],
  exports: [LivrosService],
})
export class LivrosModule {}
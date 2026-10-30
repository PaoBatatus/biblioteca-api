import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Livro } from './entities/livro.entity.js';
import { CreateLivroDto } from './dto/create-livro.dto.js';
import { AutoresService } from '../autores/autores.service.js';
import { CategoriasService } from '../categorias/categorias.service.js';

@Injectable()
export class LivrosService {
  constructor(
    @InjectRepository(Livro)
    private readonly livroRepository: Repository<Livro>,
    private readonly autoresService: AutoresService,
    private readonly categoriasService: CategoriasService,
  ) {}

  async create(createLivroDto: CreateLivroDto): Promise<Livro> {
    await this.autoresService.findOne(createLivroDto.autor_id);
    await this.categoriasService.findOne(createLivroDto.categoria_id);

    const livro = this.livroRepository.create(createLivroDto);
    return await this.livroRepository.save(livro);
  }

  async findAll(): Promise<Livro[]> {
    return await this.livroRepository.find({
      relations: { autor: true, categoria: true },
    });
  }

  async findOne(id: number): Promise<Livro> {
    const livro = await this.livroRepository.findOne({
      where: { id },
      relations: { autor: true, categoria: true },
    });
    if (!livro) {
      throw new NotFoundException(`Livro com ID ${id} não encontrado.`);
    }
    return livro;
  }

  async remove(id: number): Promise<void> {
    const livro = await this.findOne(id);
    await this.livroRepository.remove(livro);
  }
}
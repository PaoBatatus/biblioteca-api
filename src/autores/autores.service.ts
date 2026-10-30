import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autor } from './entities/autor.entity.js';
import { CreateAutorDto } from './dto/create-autor.dto.js';

@Injectable()
export class AutoresService {
  constructor(
    @InjectRepository(Autor)
    private readonly autorRepository: Repository<Autor>,
  ) {}

  async create(createAutorDto: CreateAutorDto): Promise<Autor> {
    const autor = this.autorRepository.create(createAutorDto);
    return await this.autorRepository.save(autor);
  }

  async findAll(): Promise<Autor[]> {
    return await this.autorRepository.find();
  }

  async findOne(id: number): Promise<Autor> {
    const autor = await this.autorRepository.findOne({ where: { id } });
    if (!autor) {
      throw new NotFoundException(`Autor com ID ${id} não encontrado.`);
    }
    return autor;
  }

  async remove(id: number): Promise<void> {
    const autor = await this.findOne(id);
    await this.autorRepository.remove(autor);
  }
}
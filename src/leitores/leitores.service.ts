import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leitor } from './entities/leitor.entity.js';
import { CreateLeitorDto } from './dto/create-leitor.dto.js';

@Injectable()
export class LeitoresService {
  constructor(
    @InjectRepository(Leitor)
    private readonly leitorRepository: Repository<Leitor>,
  ) {}

  async create(createLeitorDto: CreateLeitorDto): Promise<Leitor> {
    const leitor = this.leitorRepository.create(createLeitorDto);
    return await this.leitorRepository.save(leitor);
  }

  async findAll(): Promise<Leitor[]> {
    return await this.leitorRepository.find();
  }

  async findOne(id: number): Promise<Leitor> {
    const leitor = await this.leitorRepository.findOne({ where: { id } });
    if (!leitor) {
      throw new NotFoundException(`Leitor com ID ${id} não encontrado.`);
    }
    return leitor;
  }

  async remove(id: number): Promise<void> {
    const leitor = await this.findOne(id);
    await this.leitorRepository.remove(leitor);
  }
}
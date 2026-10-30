import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Emprestimo } from './entities/emprestimo.entity.js';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto.js';
import { LivrosService } from '../livros/livros.service.js';
import { LeitoresService } from '../leitores/leitores.service.js';

@Injectable()
export class EmprestimosService {
  constructor(
    @InjectRepository(Emprestimo)
    private readonly emprestimoRepository: Repository<Emprestimo>,
    private readonly livrosService: LivrosService,
    private readonly leitoresService: LeitoresService,
  ) {}

  async create(createEmprestimoDto: CreateEmprestimoDto): Promise<Emprestimo> {
    const { livro_id, leitor_id } = createEmprestimoDto;

    // 1. Validar se Livro e Leitor existem
    const livro = await this.livrosService.findOne(livro_id);
    await this.leitoresService.findOne(leitor_id);

    // 2. Verificar quantos exemplares deste livro já estão emprestados (sem data de devolução)
    const emprestimosAtivosLivro = await this.emprestimoRepository.count({
      where: { livro_id, data_devolucao: IsNull() },
    });

    if (emprestimosAtivosLivro >= livro.quantidade_total) {
      throw new BadRequestException('Não há exemplares disponíveis deste livro para empréstimo.');
    }

    // 3. Calcular data prevista (ex: 7 dias a partir de hoje)
    const dataRetirada = new Date();
    const dataPrevista = new Date();
    dataPrevista.setDate(dataRetirada.getDate() + 7);

    const emprestimo = this.emprestimoRepository.create({
      livro_id,
      leitor_id,
      data_retirada: dataRetirada,
      data_prevista: dataPrevista,
      multa: 0.00,
    });

    return await this.emprestimoRepository.save(emprestimo);
  }

  async findAll(): Promise<Emprestimo[]> {
    return await this.emprestimoRepository.find({
      relations: { livro: true, leitor: true },
    });
  }

  async findOne(id: number): Promise<Emprestimo> {
    const emprestimo = await this.emprestimoRepository.findOne({
      where: { id },
      relations: { livro: true, leitor: true },
    });
    if (!emprestimo) {
      throw new NotFoundException(`Empréstimo com ID ${id} não encontrado.`);
    }
    return emprestimo;
  }

  async devolver(id: number): Promise<Emprestimo> {
    const emprestimo = await this.findOne(id);

    if (emprestimo.data_devolucao) {
      throw new BadRequestException('Este empréstimo já foi devolvido.');
    }

    const dataDevolucao = new Date();
    emprestimo.data_devolucao = dataDevolucao;

    // Cálculo simples de multa por atraso (ex: R$ 2.00 por dia de atraso)
    if (dataDevolucao > emprestimo.data_prevista) {
      const diffTime = Math.abs(dataDevolucao.getTime() - emprestimo.data_prevista.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      emprestimo.multa = diffDays * 2.00;
    } else {
      emprestimo.multa = 0.00;
    }

    return await this.emprestimoRepository.save(emprestimo);
  }

  async remove(id: number): Promise<void> {
    const emprestimo = await this.findOne(id);
    await this.emprestimoRepository.remove(emprestimo);
  }
}
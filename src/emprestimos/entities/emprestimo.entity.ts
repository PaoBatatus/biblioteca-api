import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import type { Livro } from '../../livros/entities/livro.entity.js';
import type { Leitor } from '../../leitores/entities/leitor.entity.js';

@Entity('emprestimos')
export class Emprestimo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('Livro', { nullable: false, eager: true })
  @JoinColumn({ name: 'livro_id' })
  livro: Livro;

  @Column()
  livro_id: number;

  @ManyToOne('Leitor', { nullable: false, eager: true })
  @JoinColumn({ name: 'leitor_id' })
  leitor: Leitor;

  @Column()
  leitor_id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  data_retirada: Date;

  @Column({ type: 'datetime' })
  data_prevista: Date;

  @Column({ type: 'datetime', nullable: true })
  data_devolucao: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  multa: number;
}
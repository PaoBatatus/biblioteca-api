import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Emprestimo } from '../../emprestimos/entities/emprestimo.entity.js';

@Entity('leitores')
export class Leitor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  matricula: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @OneToMany(() => Emprestimo, (emprestimo) => emprestimo.leitor)
  emprestimos: Emprestimo[];
}
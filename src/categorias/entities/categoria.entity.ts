import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Livro } from '../../livros/entities/livro.entity.js';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, unique: true })
  nome: string;

  @OneToMany(() => Livro, (livro) => livro.categoria)
  livros: Livro[];
}
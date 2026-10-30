import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import type { Autor } from '../../autores/entities/autor.entity.js';
import type { Categoria } from '../../categorias/entities/categoria.entity.js';
import type { Emprestimo } from '../../emprestimos/entities/emprestimo.entity.js';

@Entity('livros')
export class Livro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  isbn: string;

  @Column({ type: 'int' })
  quantidade_total: number;

  @ManyToOne('Autor', (autor: any) => autor.livros, { eager: false, nullable: false })
  @JoinColumn({ name: 'autor_id' })
  autor: Autor;

  @Column()
  autor_id: number;

  @ManyToOne('Categoria', (categoria: any) => categoria.livros, { eager: false, nullable: false })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @Column()
  categoria_id: number;

  @OneToMany('Emprestimo', (emprestimo: any) => emprestimo.livro)
  emprestimos: Emprestimo[];
}
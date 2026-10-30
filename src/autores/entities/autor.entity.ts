import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Livro } from '../../livros/entities/livro.entity.js';

@Entity('autores')
export class Autor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @Column({ type: 'text', nullable: true })
  biografia: string;

  @OneToMany(() => Livro, (livro) => livro.autor)
  livros: Livro[];
}
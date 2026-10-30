import { Controller, Get, Post, Body, Param, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { EmprestimosService } from './emprestimos.service.js';
import { CreateEmprestimoDto } from './dto/create-emprestimo.dto.js';

@Controller('emprestimos')
export class EmprestimosController {
  constructor(private readonly emprestimosService: EmprestimosService) {}

  @Post()
  create(@Body() createEmprestimoDto: CreateEmprestimoDto) {
    return this.emprestimosService.create(createEmprestimoDto);
  }

  @Get()
  findAll() {
    return this.emprestimosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.emprestimosService.findOne(id);
  }

  @Patch(':id/devolver')
  devolver(@Param('id', ParseIntPipe) id: number) {
    return this.emprestimosService.devolver(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.emprestimosService.remove(id);
  }
}
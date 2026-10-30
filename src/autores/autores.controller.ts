import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AutoresService } from './autores.service.js';
import { CreateAutorDto } from './dto/create-autor.dto.js';

@Controller('autores')
export class AutoresController {
  constructor(private readonly autoresService: AutoresService) {}

  @Post()
  create(@Body() createAutorDto: CreateAutorDto) {
    return this.autoresService.create(createAutorDto);
  }

  @Get()
  findAll() {
    return this.autoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.autoresService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.autoresService.remove(id);
  }
}
import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { LeitoresService } from './leitores.service.js';
import { CreateLeitorDto } from './dto/create-leitor.dto.js';

@Controller('leitores')
export class LeitoresController {
  constructor(private readonly leitoresService: LeitoresService) {}

  @Post()
  create(@Body() createLeitorDto: CreateLeitorDto) {
    return this.leitoresService.create(createLeitorDto);
  }

  @Get()
  findAll() {
    return this.leitoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.leitoresService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.leitoresService.remove(id);
  }
}
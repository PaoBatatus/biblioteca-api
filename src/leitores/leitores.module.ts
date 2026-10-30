import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeitoresService } from './leitores.service.js';
import { LeitoresController } from './leitores.controller.js';
import { Leitor } from './entities/leitor.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Leitor])],
  controllers: [LeitoresController],
  providers: [LeitoresService],
  exports: [LeitoresService],
})
export class LeitoresModule {}
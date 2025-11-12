import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PatientDignosisService } from './patient-dignosis.service';
import { DignosisDto } from '../dto/dignosis.dto';

@Controller('patient-dignosis')
export class PatientDignosisController {
  constructor(private readonly dignosisService: PatientDignosisService) {}

  @Post("create")
  create(@Body() dto: DignosisDto) {
    return this.dignosisService.create(dto);
  }

  @Get("findall")
  findAll() {
    return this.dignosisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dignosisService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<DignosisDto>) {
    return this.dignosisService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dignosisService.remove(id);
  }
}

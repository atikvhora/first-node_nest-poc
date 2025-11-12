import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { LabTestsService } from './lab-tests.service';
import { CreateLabTestDto } from '../dto/lab_test/create-lab-test.dto';
import { UpdateLabTestDto } from '../dto/lab_test/update-lab-test.dto';

@Controller('lab-tests')
export class LabTestsController {
  constructor(private readonly labTestsService: LabTestsService) {}

  @Post("create")
  create(@Body() dto: CreateLabTestDto) {
    return this.labTestsService.create(dto);
  }

  @Get('getAll')
  findAll() {
    return this.labTestsService.findAll();
  }

  @Get('getById:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.labTestsService.findOne(id);
  }

  @Put('update:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLabTestDto) {
    return this.labTestsService.update(id, dto);
  }

  @Delete('delete:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.labTestsService.remove(id);
  }
}

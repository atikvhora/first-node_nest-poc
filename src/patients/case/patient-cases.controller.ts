import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PatientCasesService } from './patient-cases.service';
import { CreatePatientCaseDto } from '../dto/patient-cases.dto';

@Controller('patient-cases')
export class PatientCasesController {
  constructor(private readonly casesService: PatientCasesService) {}

  @Post("create")
  create(@Body() dto: CreatePatientCaseDto) {
    return this.casesService.create(dto);
  }

  @Get("findall")
  findAll() {
    return this.casesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.casesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: Partial<CreatePatientCaseDto>) {
    return this.casesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.casesService.remove(id);
  }

  @Post('fn_create_case_patient')
  async createUsingSP(
    @Body('patientId') patientId: number,
    @Body('casedescription') casedescription: string,
    @Body('prescription') prescription: string,
    @Body('status') status: string
  ) {
    return this.casesService.createPatientCaseWithFunction(patientId, casedescription, prescription, status);
  }
}
